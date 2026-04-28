import { normalizeBubbleWorkflowPostUrl } from './normalizeBubbleWorkflowUrl';

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

function getBubbleWebhookEnvName(kind: BubbleWebhookKind): string {
  return bubbleWebhookEnvByKind[kind];
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
