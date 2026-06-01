import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const shellPath = path.join(distDir, 'index.html');
const seoConfigPath = path.join(projectRoot, 'src', 'config', 'seo-routes.json');

const seoConfig = JSON.parse(await readFile(seoConfigPath, 'utf8'));
const { siteUrl, defaultOgImage, lastModified } = seoConfig;
const allPages = seoConfig.routes;

function createArticleSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    image: absoluteAsset(page.image),
    datePublished: page.publishedAt,
    dateModified: page.modifiedAt ?? page.publishedAt,
    inLanguage: 'es-PE',
    isAccessibleForFree: true,
    keywords: page.keywords,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(page.path),
    },
    author: {
      '@type': 'Organization',
      name: 'Binder',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Binder',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/lightmode_default.svg`,
      },
    },
  };
}

function createEventSchema(page) {
  if (!page.event) {
    return undefined;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: page.event.name,
    description: page.description,
    startDate: page.event.startDate,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: page.event.status,
    url: absoluteUrl(page.path),
    organizer: { '@type': 'Organization', name: 'Binder', url: siteUrl },
    location: {
      '@type': 'VirtualLocation',
      url: absoluteUrl(page.path),
    },
  };
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Binder',
    url: siteUrl,
    logo: `${siteUrl}/lightmode_default.svg`,
    description:
      'Binder es la plataforma legal con IA que centraliza, automatiza y analiza la gestión legal.',
    sameAs: ['https://www.linkedin.com/company/thelegalbinder/'],
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Binder',
    url: siteUrl,
    inLanguage: 'es-PE',
    publisher: organizationSchema(),
  };
}

function breadcrumbSchema(page) {
  const items = [{ name: 'Inicio', item: siteUrl }];

  if (page.path === '/') {
    return toBreadcrumbList(items);
  }

  if (page.path.startsWith('/prensa/')) {
    items.push({ name: 'Prensa', item: absoluteUrl('/prensa') });
  } else if (page.path.startsWith('/casos-uso/')) {
    items.push({ name: 'Soluciones', item: absoluteUrl('/soluciones') });
  }

  items.push({ name: page.h1, item: absoluteUrl(page.path) });
  return toBreadcrumbList(items);
}

function toBreadcrumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function pageSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.h1,
    headline: page.h1,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'es-PE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Binder',
      url: siteUrl,
    },
    dateModified: lastModified,
  };
}

function absoluteUrl(routePath) {
  return routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}`;
}

function absoluteAsset(assetPath = defaultOgImage) {
  return assetPath.startsWith('http') ? assetPath : `${siteUrl}${assetPath}`;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function jsonLd(schema) {
  return `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
}

function stripSeoTags(head) {
  return head
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+(?:property|name)=["'](?:og|twitter|article):[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi, '');
}

function buildSchemas(page) {
  const schemas = [
    ...(page.path === '/' ? [organizationSchema(), websiteSchema()] : []),
    breadcrumbSchema(page),
    pageSchema(page),
  ];
  const eventSchema = createEventSchema(page);

  if (page.type === 'article') {
    schemas.push(createArticleSchema(page));
  }

  if (eventSchema) {
    schemas.push(eventSchema);
  }

  return schemas;
}

function buildHead(page, baseHead) {
  const image = absoluteAsset(page.image ?? defaultOgImage);
  const head = stripSeoTags(baseHead);
  const robots = page.robots ? `<meta name="robots" content="${escapeHtml(page.robots)}" />` : '';
  const articleMeta =
    page.type === 'article'
      ? `
    <meta property="article:published_time" content="${escapeHtml(page.publishedAt)}" />
    <meta property="article:modified_time" content="${escapeHtml(page.modifiedAt ?? page.publishedAt)}" />`
      : '';

  const seoBlock = `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${absoluteUrl(page.path)}" />
    ${robots}
    <meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}" />
    <meta property="og:url" content="${absoluteUrl(page.path)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(page.h1)}" />
    <meta property="og:site_name" content="Binder" />
    <meta property="og:locale" content="es_ES" />${articleMeta}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${absoluteUrl(page.path)}" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(page.h1)}" />
    <style id="seo-fallback-styles">
      .seo-fallback{max-width:980px;margin:0 auto;padding:72px 24px;font-family:Montserrat,Arial,sans-serif;color:#1b1b1b}
      .seo-fallback h1{font-size:clamp(2rem,5vw,4rem);line-height:1.05;margin:0 0 20px;color:#0098b1}
      .seo-fallback p{font-size:1.05rem;line-height:1.75;color:#30339c;margin:0 0 14px}
      .seo-fallback nav{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
      .seo-fallback a{color:#0098b1;font-weight:700}
    </style>
    ${buildSchemas(page).map(jsonLd).join('\n    ')}
`;

  return head.replace(/(<meta\s+name=["']viewport["'][^>]*>\s*)/i, `$1${seoBlock}`);
}

function buildFallback(page) {
  const paragraphs = page.paragraphs?.length ? page.paragraphs : [page.description];
  const links = page.links?.length
    ? page.links
    : [
        { href: '/', text: 'Inicio' },
        { href: '/soluciones', text: 'Soluciones' },
        { href: '/diagnostico-legal-ops-formulario-inicio', text: 'Diagnóstico Legal Ops' },
      ];

  return `<div id="root"><main class="seo-fallback" data-seo-fallback="true">
    <h1>${escapeHtml(page.h1)}</h1>
    ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n    ')}
    <nav aria-label="Enlaces relacionados">
      ${links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a>`).join('\n      ')}
    </nav>
  </main></div>`;
}

function renderPage(shell, page) {
  const headMatch = shell.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) {
    throw new Error('No se encontró <head> en dist/index.html');
  }

  const nextHead = buildHead(page, headMatch[1]);
  return shell
    .replace(/<html\s+lang=["'][^"']+["']>/i, '<html lang="es-PE">')
    .replace(/<head>[\s\S]*?<\/head>/i, `<head>${nextHead}</head>`)
    .replace(/<div id="root"><\/div>/i, buildFallback(page));
}

function outputPath(routePath) {
  if (routePath === '/') {
    return shellPath;
  }

  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

async function writeRoute(shell, page) {
  const target = outputPath(page.path);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, renderPage(shell, page), 'utf8');
}

async function write404(shell) {
  const page = {
    path: '/404',
    title: 'Página no disponible | Binder',
    description: 'La página que buscas no existe o ya no está disponible en Binder.',
    h1: 'Página no disponible',
    robots: 'noindex, nofollow',
    paragraphs: ['La ruta que intentas abrir no existe, fue retirada o ya no está disponible.'],
    links: [
      { href: '/', text: 'Volver al inicio' },
      { href: '/#contacto', text: 'Ir al formulario de contacto' },
    ],
  };

  await writeFile(path.join(distDir, '404.html'), renderPage(shell, page), 'utf8');
}

function buildSitemap() {
  const urls = allPages
    .filter((page) => !page.robots?.includes('noindex'))
    .map(
      (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq ?? 'monthly'}</changefreq>
    <priority>${page.priority ?? '0.5'}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const shell = await readFile(shellPath, 'utf8');

for (const page of allPages) {
  await writeRoute(shell, page);
}

await write404(shell);
const sitemap = buildSitemap();
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(projectRoot, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated SEO HTML for ${allPages.length} routes, sitemap.xml and 404.html`);
