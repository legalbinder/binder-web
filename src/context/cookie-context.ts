import { createContext } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

interface CookieContextType {
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
