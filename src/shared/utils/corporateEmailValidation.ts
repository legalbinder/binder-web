const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'yahoo.com',
  'yahoo.es',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'gmx.com',
  'gmx.net',
  'mail.com',
]);

export const CORPORATE_EMAIL_REQUIRED_MESSAGE =
  'Ingresa un email corporativo para continuar.';

export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getEmailDomain(email: string): string | null {
  const [, domain] = email.trim().toLowerCase().split('@');
  return domain || null;
}

export function isBlockedPersonalEmailDomain(
  domain: string,
  additionalBlockedDomains: string[] = []
): boolean {
  const normalizedDomain = domain.trim().toLowerCase();
  const blockedDomains = new Set([
    ...PERSONAL_EMAIL_DOMAINS,
    ...additionalBlockedDomains.map((blockedDomain) => blockedDomain.trim().toLowerCase()),
  ]);

  return blockedDomains.has(normalizedDomain);
}

export function normalizeEmailDomain(email: string): string {
  const trimmedEmail = email.trim();
  const atPosition = trimmedEmail.lastIndexOf('@');

  return atPosition > 0
    ? `${trimmedEmail.slice(0, atPosition + 1)}${trimmedEmail.slice(atPosition + 1).toLowerCase()}`
    : trimmedEmail;
}

interface ValidateEmailOptions {
  requiredMessage: string;
  invalidMessage: string;
  blockedDomains?: string[];
  corporateMessage?: string;
}

export function validateEmail(
  email: string,
  {
    requiredMessage,
    invalidMessage,
    blockedDomains,
    corporateMessage = CORPORATE_EMAIL_REQUIRED_MESSAGE,
  }: ValidateEmailOptions
): string | undefined {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return requiredMessage;
  }

  if (!isValidEmailFormat(trimmedEmail)) {
    return invalidMessage;
  }

  if (blockedDomains) {
    const domain = getEmailDomain(trimmedEmail);
    if (domain && isBlockedPersonalEmailDomain(domain, blockedDomains)) {
      return corporateMessage;
    }
  }

  return undefined;
}
