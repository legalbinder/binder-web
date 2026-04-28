const FORM_SUBMISSION_STORAGE_KEY = 'binder-form-submission';

export interface FormSubmissionData {
  name: string;
  company: string;
  email: string;
}

export function storeFormSubmission(data: FormSubmissionData): void {
  window.sessionStorage.setItem(FORM_SUBMISSION_STORAGE_KEY, JSON.stringify(data));
}

export function readFormSubmission(): FormSubmissionData | null {
  const rawData = window.sessionStorage.getItem(FORM_SUBMISSION_STORAGE_KEY);

  if (!rawData) {
    return null;
  }

  try {
    return JSON.parse(rawData) as FormSubmissionData;
  } catch {
    return null;
  }
}

export function clearFormSubmission(): void {
  window.sessionStorage.removeItem(FORM_SUBMISSION_STORAGE_KEY);
}
