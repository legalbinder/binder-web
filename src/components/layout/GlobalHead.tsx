import { Helmet } from 'react-helmet-async';
import { SchemaMarkup } from '../seo/SchemaMarkup';

export const GlobalHead = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <SchemaMarkup type="organization" />
    </>
  );
};








