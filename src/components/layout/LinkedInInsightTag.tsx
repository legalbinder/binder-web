import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookie } from '../../context/useCookie';
import {
  ensureLinkedInInsightTag,
  getTrackingConfig,
  removeLinkedInInsightTag,
} from '../../utils/tracking';

export const LinkedInInsightTag = () => {
  const { pathname } = useLocation();
  const {
    preferences: { analytics },
  } = useCookie();

  const linkedInPartnerId = getTrackingConfig().linkedInPartnerId;
  const isEventPage = pathname.startsWith('/eventos/');
  const shouldEnable = Boolean(analytics && linkedInPartnerId && isEventPage);

  useEffect(() => {
    if (!shouldEnable || !linkedInPartnerId) {
      removeLinkedInInsightTag(linkedInPartnerId);
      return;
    }

    ensureLinkedInInsightTag(linkedInPartnerId);

    return () => {
      removeLinkedInInsightTag(linkedInPartnerId);
    };
  }, [linkedInPartnerId, shouldEnable]);

  if (!shouldEnable || !linkedInPartnerId) {
    return null;
  }

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src={`https://px.ads.linkedin.com/collect/?pid=${encodeURIComponent(linkedInPartnerId)}&fmt=gif`}
      />
    </noscript>
  );
};
