import { useEffect, useState, type ReactNode } from 'react';
import { CookieContext, type CookiePreferences } from './cookie-context';

const STORAGE_KEY = 'binder-cookie-consent';
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  analytics: false,
};

const readStoredPreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  const storedPreferences = window.localStorage.getItem(STORAGE_KEY);
  if (!storedPreferences) {
    return DEFAULT_PREFERENCES;
  }

  try {
    const parsedPreferences = JSON.parse(storedPreferences) as Partial<CookiePreferences>;
    return {
      essential: true,
      analytics: parsedPreferences.analytics ?? false,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

const hasStoredConsent = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) !== null;
};

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(hasStoredConsent);
  const [preferences, setPreferences] = useState<CookiePreferences>(readStoredPreferences);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const hasAnalyticsConsent = hasConsent && preferences.analytics;

  useEffect(() => {
    if (hasConsent) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [hasConsent, preferences]);

  const acceptAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
    };
    setPreferences(newPreferences);
    setHasConsent(true);
    setIsSettingsOpen(false);
  };

  const rejectAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
    };
    setPreferences(newPreferences);
    setHasConsent(true);
    setIsSettingsOpen(false);
  };

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPreferences,
      essential: true, // Always true
    }));
    setHasConsent(true);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <CookieContext.Provider
      value={{
        hasConsent,
        hasAnalyticsConsent,
        preferences,
        acceptAll,
        rejectAll,
        updatePreferences,
        openSettings,
        closeSettings,
        isSettingsOpen,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

