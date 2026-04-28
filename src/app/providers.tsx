import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BackgroundProvider } from '../context/BackgroundContext';
import { CookieProvider } from '../context/CookieContext';
import { ThemeProvider } from '../context/ThemeContext';

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <HelmetProvider>
    <ThemeProvider>
      <BackgroundProvider>
        <CookieProvider>{children}</CookieProvider>
      </BackgroundProvider>
    </ThemeProvider>
  </HelmetProvider>
);
