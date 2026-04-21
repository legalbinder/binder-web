import { useContext } from 'react';
import { CookieContext } from './cookie-context';

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};
