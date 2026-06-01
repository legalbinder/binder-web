import type { BubbleFormOrigin, BubbleFormPayload } from '../integrations/bubble/bubbleWebhooks';
import { PRIVACY_CONSENT_TEXT } from './privacyConsent';

interface BubbleFormPayloadBaseOptions {
  origen: BubbleFormOrigin;
  privacyConsent: boolean;
  fechaEnvio?: string;
}

export function buildBubbleFormPayloadBase({
  origen,
  privacyConsent,
  fechaEnvio = new Date().toISOString(),
}: BubbleFormPayloadBaseOptions): Pick<
  BubbleFormPayload,
  'origen' | 'fechaEnvio' | 'textoExtra24' | 'booleanoExtra01' | 'fechaExtra01'
> {
  return {
    origen,
    fechaEnvio,
    textoExtra24: PRIVACY_CONSENT_TEXT,
    booleanoExtra01: privacyConsent,
    fechaExtra01: fechaEnvio,
  };
}
