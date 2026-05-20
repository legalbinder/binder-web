import {
  CORPORATE_EMAIL_REQUIRED_MESSAGE,
  getEmailDomain,
  isBlockedPersonalEmailDomain,
} from '../../utils/corporateEmailValidation';
import type { BubbleFormOrigin, BubbleFormPayload } from '../../integrations/bubble/bubbleWebhooks';
import type { FormSubmissionData } from '../../utils/formSubmission';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

export interface LeadCaptureFormData {
  name: string;
  company: string;
  email: string;
  phoneCountry: string;
  phone: string;
  message: string;
  consent: boolean;
}

export interface LeadCaptureFormErrors {
  name?: string;
  company?: string;
  email?: string;
  consent?: string;
  submit?: string;
}

interface BuildLeadCapturePayloadOptions {
  origen: Extract<
    BubbleFormOrigin,
    | 'formulario-contacto'
    | 'formulario-caso-procesos'
    | 'formulario-caso-clm'
    | 'formulario-caso-expediente'
  >;
  emptyChallengeValue: string | null;
}

export function getDefaultCountryCode(countries: Country[]): string {
  return countries.find((country) => country.code === 'PE')?.code ?? countries[0]?.code ?? 'PE';
}

export function createLeadCaptureFormData(defaultCountryCode: string): LeadCaptureFormData {
  return {
    name: '',
    company: '',
    email: '',
    phoneCountry: defaultCountryCode,
    phone: '',
    message: '',
    consent: false,
  };
}

export function validateLeadCaptureForm(
  formData: LeadCaptureFormData,
  blockedDomains: string[]
): LeadCaptureFormErrors {
  const errors: LeadCaptureFormErrors = {};
  const email = formData.email.trim();

  if (!formData.name.trim()) {
    errors.name = 'El nombre es requerido';
  }

  if (!formData.company.trim()) {
    errors.company = 'La empresa es requerida';
  }

  if (!email) {
    errors.email = 'El correo es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Correo inválido';
  } else {
    const emailDomain = getEmailDomain(email);
    if (emailDomain && isBlockedPersonalEmailDomain(emailDomain, blockedDomains)) {
      errors.email = CORPORATE_EMAIL_REQUIRED_MESSAGE;
    }
  }

  if (!formData.consent) {
    errors.consent = 'Debes aceptar el consentimiento';
  }

  return errors;
}

export function normalizeLeadCaptureEmail(email: string): string {
  const trimmedEmail = email.trim();
  const atPosition = trimmedEmail.lastIndexOf('@');

  return atPosition > 0
    ? `${trimmedEmail.slice(0, atPosition + 1)}${trimmedEmail.slice(atPosition + 1).toLowerCase()}`
    : trimmedEmail;
}

export function formatLeadCapturePhone(
  countries: Country[],
  phoneCountryCode: string,
  phone: string
): string | null {
  const dialCode = countries.find((country) => country.code === phoneCountryCode)?.dialCode ?? '';
  const phoneDigits = phone.replace(/\D/g, '');

  return phoneDigits ? `${dialCode} ${phoneDigits}`.trim() : null;
}

export function buildLeadCapturePayload(
  formData: LeadCaptureFormData,
  countries: Country[],
  options: BuildLeadCapturePayloadOptions
): BubbleFormPayload {
  const phone = formatLeadCapturePhone(countries, formData.phoneCountry, formData.phone);
  const trimmedMessage = formData.message.trim();
  const fechaEnvio = new Date().toISOString();

  return {
    origen: options.origen,
    fechaEnvio,
    textoExtra01: formData.name.trim(),
    textoExtra04: normalizeLeadCaptureEmail(formData.email),
    textoExtra05: phone,
    textoExtra06: formData.phoneCountry,
    textoExtra07: formData.company.trim(),
    textoExtra10: trimmedMessage || options.emptyChallengeValue,
    textoExtra11: `${window.location.pathname}${window.location.hash}`,
    booleanoExtra01: formData.consent,
    fechaExtra01: fechaEnvio,
  };
}

export function createLeadCaptureSubmissionData(
  formData: LeadCaptureFormData
): FormSubmissionData {
  return {
    name: formData.name.trim(),
    company: formData.company.trim(),
    email: normalizeLeadCaptureEmail(formData.email),
  };
}
