import { createContext } from 'react';

export type CookieCategory = 'essential' | 'analytics';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

export interface CookieContextType {
  hasConsent: boolean;
  hasAnalyticsConsent: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  isSettingsOpen: boolean;
}

export const CookieContext = createContext<CookieContextType | undefined>(undefined);
