import { type FormEvent, useMemo, useState } from 'react';
import { postBubbleWorkflow } from '../utils/bubbleWorkflowRequest';
import type { BinderlaFormularioPayload } from '../utils/eventoCierreBubble';
import { storeFormSubmission } from '../utils/formSubmission';
import {
  buildLeadCapturePayload,
  createLeadCaptureFormData,
  createLeadCaptureSubmissionData,
  getDefaultCountryCode,
  type Country,
  type LeadCaptureFormData,
  type LeadCaptureFormErrors,
  validateLeadCaptureForm,
} from '../utils/leadCapture';

interface UseLeadCaptureFormOptions {
  blockedDomains: string[];
  countries: Country[];
  resolveWebhookUrl: () => string;
  source: BinderlaFormularioPayload['source'];
  emptyChallengeValue: string | null;
  onSuccess: () => void;
}

interface UseLeadCaptureFormResult {
  formData: LeadCaptureFormData;
  errors: LeadCaptureFormErrors;
  isSubmitting: boolean;
  handleChange: (field: keyof LeadCaptureFormData, value: string | boolean) => void;
  handleSubmit: (event: FormEvent) => Promise<void>;
}

export function useLeadCaptureForm({
  blockedDomains,
  countries,
  resolveWebhookUrl,
  source,
  emptyChallengeValue,
  onSuccess,
}: UseLeadCaptureFormOptions): UseLeadCaptureFormResult {
  const defaultCountryCode = useMemo(() => getDefaultCountryCode(countries), [countries]);
  const [formData, setFormData] = useState<LeadCaptureFormData>(() =>
    createLeadCaptureFormData(defaultCountryCode)
  );
  const [errors, setErrors] = useState<LeadCaptureFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof LeadCaptureFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof LeadCaptureFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (field === 'email' && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validateLeadCaptureForm(formData, blockedDomains);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const requestBody = buildLeadCapturePayload(formData, countries, {
        source,
        emptyChallengeValue,
      });

      await postBubbleWorkflow(resolveWebhookUrl(), requestBody);
      storeFormSubmission(createLeadCaptureSubmissionData(formData));
      onSuccess();
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.',
      });
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
