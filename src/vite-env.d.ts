/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_HOME_CONTACT_WEBHOOK_URL?: string;
  readonly VITE_EVENTS_WEBHOOK_URL?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
  readonly VITE_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
