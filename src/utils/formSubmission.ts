export interface FormSubmissionData {
  name: string;
  company: string;
  email: string;
}

const FORM_SUBMISSION_STORAGE_KEY = 'formSubmission';

export function storeFormSubmission(data: FormSubmissionData): void {
  sessionStorage.setItem(FORM_SUBMISSION_STORAGE_KEY, JSON.stringify(data));
}

export function readFormSubmission(): FormSubmissionData | null {
  const stored = sessionStorage.getItem(FORM_SUBMISSION_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as FormSubmissionData;
  } catch {
    return null;
  }
}

export function clearFormSubmission(): void {
  sessionStorage.removeItem(FORM_SUBMISSION_STORAGE_KEY);
}
