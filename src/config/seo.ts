import seoRoutesConfig from './seo-routes.json';

export type OgType = 'website' | 'article';
export type SitemapChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SeoRouteLink {
  href: string;
  text: string;
}

export interface SeoRouteEvent {
  name: string;
  startDate: string;
  status: string;
}

export interface SeoRouteMetadata {
  path: string;
  title: string;
  description: string;
  h1: string;
  image?: string;
  type?: OgType;
  robots?: string;
  publishedAt?: string;
  modifiedAt?: string;
  priority?: string;
  changefreq?: SitemapChangeFrequency;
  keywords?: string[];
  sources?: string[];
  paragraphs?: string[];
  links?: SeoRouteLink[];
  event?: SeoRouteEvent;
}

interface SeoConfig {
  siteUrl: string;
  defaultOgImage: string;
  lastModified: string;
  routes: SeoRouteMetadata[];
}

export const seoConfig = seoRoutesConfig as SeoConfig;
export const siteUrl = seoConfig.siteUrl;
export const defaultOgImage = seoConfig.defaultOgImage;
export const lastModified = seoConfig.lastModified;
export const seoRoutes = seoConfig.routes;

export function normalizeRoutePath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
}

export function getSeoRoute(path: string): SeoRouteMetadata | undefined {
  const normalizedPath = normalizeRoutePath(path);
  return seoRoutes.find((route) => normalizeRoutePath(route.path) === normalizedPath);
}

export function toAbsoluteUrl(path: string): string {
  return normalizeRoutePath(path) === '/' ? `${siteUrl}/` : `${siteUrl}${normalizeRoutePath(path)}`;
}

export function toAbsoluteAsset(path = defaultOgImage): string {
  return path.startsWith('http') ? path : `${siteUrl}${path}`;
}
