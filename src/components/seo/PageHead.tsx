import { Helmet } from 'react-helmet-async';
import {
  defaultOgImage,
  getSeoRoute,
  siteUrl,
  toAbsoluteAsset,
  toAbsoluteUrl,
  type OgType,
} from '../../config/seo';

interface PageHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: OgType;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const PageHead = ({ 
  title, 
  description, 
  canonicalUrl,
  ogImage = defaultOgImage,
  ogType = 'website',
  robots,
  publishedTime,
  modifiedTime,
}: PageHeadProps) => {
  const routeMetadata = canonicalUrl ? getSeoRoute(canonicalUrl) : undefined;
  const seoTitle = routeMetadata?.title ?? title;
  const seoDescription = routeMetadata?.description ?? description;
  const seoCanonicalUrl = canonicalUrl ?? routeMetadata?.path;
  const seoRobots = routeMetadata?.robots ?? robots;
  const seoOgType = routeMetadata?.type ?? ogType;
  const seoOgImage = routeMetadata?.image ?? ogImage;
  const seoPublishedTime = routeMetadata?.publishedAt ?? publishedTime;
  const seoModifiedTime = routeMetadata?.modifiedAt ?? modifiedTime;
  const fullUrl = seoCanonicalUrl ? toAbsoluteUrl(seoCanonicalUrl) : siteUrl;
  const ogImageUrl = toAbsoluteAsset(seoOgImage);

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {seoCanonicalUrl && <link rel="canonical" href={fullUrl} />}
      {seoRobots && <meta name="robots" content={seoRobots} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoOgType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:site_name" content="Binder" />
      <meta property="og:locale" content="es_ES" />
      {seoPublishedTime && <meta property="article:published_time" content={seoPublishedTime} />}
      {seoModifiedTime && <meta property="article:modified_time" content={seoModifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={seoTitle} />
    </Helmet>
  );
};



