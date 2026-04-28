import { useLocation } from 'react-router-dom';
import { GlobalHead } from '../components/layout/GlobalHead';
import { GoogleAnalytics } from '../components/layout/GoogleAnalytics';
import { LinkedInInsightTag } from '../components/layout/LinkedInInsightTag';
import { Navigation } from '../components/layout/Navigation';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { Footer } from '../components/sections/Footer';
import { BackgroundRenderer } from '../components/ui/BackgroundRenderer';
import { CookieBanner } from '../components/ui/CookieBanner';
import { CookieSettings } from '../components/ui/CookieSettings';
import { AppRoutes } from './routes';

export const AppLayout = () => {
  const location = useLocation();
  const isEventPage = location.pathname.startsWith('/eventos/');

  return (
    <div className="app">
      <GlobalHead />
      <ScrollToTop />
      <GoogleAnalytics />
      <LinkedInInsightTag />
      {!isEventPage && <BackgroundRenderer />}
      <CookieBanner />
      <CookieSettings />
      {!isEventPage && <Navigation />}
      <AppRoutes />
      {!isEventPage && <Footer />}
    </div>
  );
};
