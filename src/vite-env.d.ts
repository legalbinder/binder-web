/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL?: string;
  readonly VITE_BUBBLE_EVENT_REGISTRATION_WEBHOOK_URL?: string;
  readonly VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL?: string;
  readonly VITE_BUBBLE_COMPLAINT_BOOK_WEBHOOK_URL?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
