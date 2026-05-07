import { Link, Navigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { PageHead } from '../../components/seo/PageHead';
import { getAdjacentPressStories, getPressStoryBySlug } from '../../content/prensa';
import { JsonLd, PressContactBlock } from './PressComponents';
import './Press.css';

const siteUrl = 'https://binder.la';

export const PressStoryPage = () => {
  const { slug } = useParams();
  const story = getPressStoryBySlug(slug);

  if (!story) {
    return <Navigate to="/prensa" replace />;
  }

  const { previous, next } = getAdjacentPressStories(story.slug);
  const pageUrl = `${siteUrl}/prensa/${story.slug}`;
  const storySchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Prensa',
          item: `${siteUrl}/prensa`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: story.title,
          item: pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: story.title,
      description: story.description,
      image: `${siteUrl}${story.image}`,
      datePublished: story.publishedAt,
      dateModified: story.publishedAt,
      inLanguage: 'es-PE',
      about: story.keyword,
      isAccessibleForFree: true,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
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
      citation: story.coverage.map((item) => item.url),
    },
  ];

  return (
    <main className="press-story-page section-has-local-background">
      <PageHead
        title={story.seoTitle}
        description={story.description}
        canonicalUrl={`/prensa/${story.slug}`}
        ogImage={story.image}
      />
      <JsonLd data={storySchema} />

      <article>
        <section className="press-story-hero">
          <div className="press-container">
            <Breadcrumbs
              items={[
                { label: 'Inicio', path: '/' },
                { label: 'Prensa', path: '/prensa' },
                { label: story.title, path: `/prensa/${story.slug}` },
              ]}
            />

            <div className="press-story-hero__grid">
              <div className="press-story-hero__content">
                <div className="press-story-hero__meta">
                  <span>{story.tag}</span>
                  <span>{story.dateLabel}</span>
                </div>
                <h1>{story.title}</h1>
                <p>{story.description}</p>
                <div className="press-story-hero__keyword">{story.keyword}</div>
              </div>

              <figure className="press-story-hero__figure">
                <img src={story.image} alt={story.imageAlt} />
                <figcaption>
                  <strong>{story.heroStat.value}</strong>
                  <span>{story.heroStat.label}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="press-container">
          <div className="press-article-layout">
            <div className="press-article-body">
              {story.body.map((block, index) => {
                if (block.type === 'heading') {
                  return <h2 key={`${block.type}-${index}`}>{block.text}</h2>;
                }

                if (block.type === 'quote') {
                  return (
                    <blockquote key={`${block.type}-${index}`}>
                      <p>{block.text}</p>
                      <cite>{block.cite}</cite>
                    </blockquote>
                  );
                }

                return <p key={`${block.type}-${index}`}>{block.text}</p>;
              })}
            </div>

            <aside className="press-article-sidebar" aria-label="Datos y cobertura">
              <section className="press-sidebar-panel">
                <h2>Datos destacados</h2>
                <div className="press-sidebar-stats">
                  {story.sidebarStats.map((stat) => (
                    <div key={`${stat.value}-${stat.label}`}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="press-sidebar-panel">
                <h2>Cobertura original</h2>
                <div className="press-coverage-links">
                  {story.coverage.map((item) => (
                    <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.outlet}
                    </a>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <nav className="press-story-nav" aria-label="Historias de prensa">
            {previous ? (
              <Link to={`/prensa/${previous.slug}`}>
                <span>Anterior</span>
                {previous.title}
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}

            {next ? (
              <Link to={`/prensa/${next.slug}`}>
                <span>Siguiente</span>
                {next.title}
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </nav>

          <PressContactBlock />
        </div>
      </article>
    </main>
  );
};
