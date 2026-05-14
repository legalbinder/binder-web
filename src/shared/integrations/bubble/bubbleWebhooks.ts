import { normalizeBubbleWorkflowPostUrl } from './normalizeBubbleWorkflowUrl';

const bubbleWebhookEnvKey = 'VITE_BUBBLE_WEBHOOK_URL';

function readBubbleWebhookEnvValue(): string | undefined {
  const rawValue = import.meta.env[bubbleWebhookEnvKey]?.trim();
  return rawValue ? normalizeBubbleWorkflowPostUrl(rawValue) : undefined;
}

export function getBubbleWebhookUrl(): string {
  const url = readBubbleWebhookEnvValue();

  if (!url) {
    throw new Error(`Configura ${bubbleWebhookEnvKey} antes de publicar este formulario.`);
  }

  return url;
}

export interface EventRegistrationPayload {
  Nombres: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  phone: string;
  phoneCountry: string;
  consent: boolean;
  timestamp: string;
  source?: 'event-registration';
  eventSlug?: string;
}

export interface LeadCapturePayload {
  name: string;
  company: string;
  email: string;
  phone: string | null;
  telefono: string | null;
  phoneCountry: string;
  challenge: string | null;
  consent: boolean;
  timestamp: string;
  source:
    | 'contact-form'
    | 'cases-contact-form'
    | 'deals-contact-form'
    | 'expediente-contact-form';
}
