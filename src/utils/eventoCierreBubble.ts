import { normalizeBubbleWorkflowPostUrl } from './bubbleWorkflowUrl';

export type BubbleWebhookKind =
  | 'homeContactForm'
  | 'eventRegistrationForm'
  | 'useCasesAndDiagnosisForm'
  | 'complaintBookForm';

const bubbleWebhookEnvByKind = {
  homeContactForm: 'VITE_BUBBLE_HOME_CONTACT_WEBHOOK_URL',
  eventRegistrationForm: 'VITE_BUBBLE_EVENT_REGISTRATION_WEBHOOK_URL',
  useCasesAndDiagnosisForm: 'VITE_BUBBLE_USE_CASES_AND_DIAGNOSIS_WEBHOOK_URL',
  complaintBookForm: 'VITE_BUBBLE_COMPLAINT_BOOK_WEBHOOK_URL',
} as const;

function readBubbleWebhookEnvValue(kind: BubbleWebhookKind): string | undefined {
  const envKey = bubbleWebhookEnvByKind[kind];
  const rawValue = import.meta.env[envKey]?.trim();

  return rawValue ? normalizeBubbleWorkflowPostUrl(rawValue) : undefined;
}

export function getBubbleWebhookEnvName(kind: BubbleWebhookKind): string {
  return bubbleWebhookEnvByKind[kind];
}

export function isBubbleWebhookConfigured(kind: BubbleWebhookKind): boolean {
  return Boolean(readBubbleWebhookEnvValue(kind));
}

export function getBubbleWebhookUrl(kind: BubbleWebhookKind): string {
  const url = readBubbleWebhookEnvValue(kind);

  if (!url) {
    throw new Error(
      `Configura ${getBubbleWebhookEnvName(kind)} antes de publicar este formulario.`
    );
  }

  return url;
}

export interface EventoCierreBubblePayload {
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

export interface BinderlaFormularioPayload {
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

export function splitFullNameForBubble(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: '-', lastName: '-' };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '-' };
  }

  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}
