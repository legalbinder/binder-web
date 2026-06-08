import { useEffect, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

const getIsMobile = () => (
  typeof window === 'undefined' ? false : window.matchMedia(MOBILE_MEDIA_QUERY).matches
);

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
};
