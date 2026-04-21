import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookie } from '../../context/useCookie';
import {
  ensureGoogleAnalytics,
  getTrackingConfig,
  removeGoogleAnalytics,
  trackPageView,
} from '../../utils/tracking';

export const GoogleAnalytics = () => {
  const { pathname } = useLocation();
  const {
    preferences: { analytics },
  } = useCookie();

  useEffect(() => {
    const config = getTrackingConfig().googleAnalytics;

    if (!analytics || !config) {
      removeGoogleAnalytics();
      return;
    }

    ensureGoogleAnalytics(config);
    trackPageView(pathname);
  }, [analytics, pathname]);

  return null;
};
