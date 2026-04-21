const trimOptionalValue = (value: string | undefined): string | undefined => {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : undefined;
};

const isTrackingId = (value: string | undefined): value is string => Boolean(value);

export const trackingConfig = {
  gaMeasurementId: trimOptionalValue(import.meta.env.VITE_GA_MEASUREMENT_ID),
  googleAdsId: trimOptionalValue(import.meta.env.VITE_GOOGLE_ADS_ID),
  linkedinPartnerId: trimOptionalValue(import.meta.env.VITE_LINKEDIN_PARTNER_ID),
} as const;

export const configuredGoogleTagIds = [
  trackingConfig.gaMeasurementId,
  trackingConfig.googleAdsId,
].filter(isTrackingId);
