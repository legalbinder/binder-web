import {
  CORPORATE_EMAIL_REQUIRED_MESSAGE,
  getEmailDomain,
  isBlockedPersonalEmailDomain,
} from './corporateEmailValidation';
import type { BinderlaFormularioPayload } from './eventoCierreBubble';
import type { FormSubmissionData } from './formSubmission';

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

export interface BuildLeadCapturePayloadOptions {
  source: BinderlaFormularioPayload['source'];
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
): BinderlaFormularioPayload {
  const phone = formatLeadCapturePhone(countries, formData.phoneCountry, formData.phone);
  const trimmedMessage = formData.message.trim();

  return {
    name: formData.name.trim(),
    company: formData.company.trim(),
    email: normalizeLeadCaptureEmail(formData.email),
    phone,
    telefono: phone,
    phoneCountry: formData.phoneCountry,
    challenge: trimmedMessage || options.emptyChallengeValue,
    consent: formData.consent,
    timestamp: new Date().toISOString(),
    source: options.source,
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
