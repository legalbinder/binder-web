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
