import { trackingConfig } from '../tracking/config';

const GOOGLE_ANALYTICS_SCRIPT_ID = 'google-analytics-script';
const LINKEDIN_SCRIPT_ID = 'linkedin-insight-script';

export interface GoogleAnalyticsConfig {
  measurementId: string;
  adsId?: string;
}

export interface TrackingConfig {
  googleAnalytics?: GoogleAnalyticsConfig;
  linkedInPartnerId?: string;
}

export interface Gtag {
  (command: 'js', value: Date): void;
  (command: 'config', targetId: string, params?: Record<string, unknown>): void;
  (command: 'event', eventName: string, params?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: ((action: string, payload?: unknown) => void) & { q?: unknown[] };
  }
}

export function getTrackingConfig(): TrackingConfig {
  return {
    googleAnalytics: trackingConfig.gaMeasurementId
      ? {
          measurementId: trackingConfig.gaMeasurementId,
          adsId: trackingConfig.googleAdsId,
        }
      : undefined,
    linkedInPartnerId: trackingConfig.linkedinPartnerId,
  };
}

export function ensureGoogleAnalytics(config: GoogleAnalyticsConfig): void {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (!window.gtag) {
    const gtag: Gtag = (...args) => {
      window.dataLayer?.push(args);
    };
    window.gtag = gtag;
    window.gtag('js', new Date());
  }

  if (!document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GOOGLE_ANALYTICS_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.measurementId)}`;
    document.head.appendChild(script);
  }

  window.gtag('config', config.measurementId, { send_page_view: false });

  if (config.adsId) {
    window.gtag('config', config.adsId);
  }
}

export function removeGoogleAnalytics(): void {
  const script = document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID);
  script?.remove();
  delete window.gtag;
  delete window.dataLayer;
}

export function trackPageView(pathname: string): void {
  const config = getTrackingConfig().googleAnalytics;
  if (!config || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('config', config.measurementId, {
    page_path: pathname,
  });
}

export function trackGoogleEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}

export function ensureLinkedInInsightTag(partnerId: string): void {
  window._linkedin_partner_id = partnerId;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];

  if (!window._linkedin_data_partner_ids.includes(partnerId)) {
    window._linkedin_data_partner_ids.push(partnerId);
  }

  if (!window.lintrk) {
    const lintrk = ((action: string, payload?: unknown) => {
      lintrk.q = lintrk.q || [];
      lintrk.q.push([action, payload]);
    }) as ((action: string, payload?: unknown) => void) & { q?: unknown[] };
    lintrk.q = [];
    window.lintrk = lintrk;
  }

  if (!document.getElementById(LINKEDIN_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = LINKEDIN_SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);
  }
}

export function removeLinkedInInsightTag(partnerId?: string): void {
  const script = document.getElementById(LINKEDIN_SCRIPT_ID);
  script?.remove();

  if (window._linkedin_data_partner_ids && partnerId) {
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids.filter(
      (id) => id !== partnerId
    );
  }

  if (!window._linkedin_data_partner_ids || window._linkedin_data_partner_ids.length === 0) {
    delete window._linkedin_partner_id;
    delete window._linkedin_data_partner_ids;
    delete window.lintrk;
  }
}
