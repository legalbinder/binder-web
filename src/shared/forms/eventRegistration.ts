import type { BubbleFormPayload } from '../integrations/bubble/bubbleWebhooks';
import { normalizeEmailDomain, validateEmail } from '../utils/corporateEmailValidation';
import { buildBubbleFormPayloadBase } from './bubbleFormPayload';
import { formatLeadCapturePhone, type Country } from './lead-capture/leadCapture';

export interface EventRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  phoneCountry: string;
  phone: string;
  consent: boolean;
}

export interface EventRegistrationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  jobTitle?: string;
  company?: string;
  consent?: string;
  submit?: string;
}

export function validateEventRegistrationForm(
  formData: EventRegistrationFormData,
  blockedDomains: string[]
): EventRegistrationErrors {
  const errors: EventRegistrationErrors = {};

  if (!formData.firstName.trim()) errors.firstName = 'El nombre es requerido';
  if (!formData.lastName.trim()) errors.lastName = 'El apellido es requerido';

  const emailError = validateEmail(formData.email, {
    requiredMessage: 'El correo es requerido',
    invalidMessage: 'Correo inválido',
    blockedDomains,
  });
  if (emailError) {
    errors.email = emailError;
  }

  if (!formData.jobTitle.trim()) errors.jobTitle = 'El cargo es requerido';
  if (!formData.company.trim()) errors.company = 'La empresa es requerida';
  if (!formData.consent) {
    errors.consent = 'Debes aceptar la Política de Privacidad para continuar';
  }

  return errors;
}

export function buildEventRegistrationPayload({
  formData,
  countries,
  canonicalPath,
  eventSlug,
}: {
  formData: EventRegistrationFormData;
  countries: Country[];
  canonicalPath: string;
  eventSlug: string;
}): BubbleFormPayload {
  return {
    ...buildBubbleFormPayloadBase({
      origen: 'registro-evento',
      privacyConsent: formData.consent,
    }),
    textoExtra01: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
    textoExtra02: formData.firstName.trim(),
    textoExtra03: formData.lastName.trim(),
    textoExtra04: normalizeEmailDomain(formData.email),
    textoExtra05: formatLeadCapturePhone(countries, formData.phoneCountry, formData.phone) ?? '',
    textoExtra06: formData.phoneCountry,
    textoExtra07: formData.company.trim(),
    textoExtra08: formData.jobTitle.trim(),
    textoExtra11: canonicalPath,
    textoExtra12: eventSlug,
  };
}
