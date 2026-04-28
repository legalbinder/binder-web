import { LeadCaptureSection } from '../../shared/forms/lead-capture/LeadCaptureSection';
import './DealsContact.css';

export const DealsContact = () => (
  <LeadCaptureSection
    id="deals-contact"
    source="deals-contact-form"
    webhookKind="useCasesAndDiagnosisForm"
    emptyChallengeValue={null}
    classes={{
      section: 'deals-contact-section',
      grid: 'deals-contact-grid',
      text: 'deals-contact-text',
      title: 'deals-contact-title',
      description: 'deals-contact-description',
      cta: 'deals-contact-cta',
      formContainer: 'deals-contact-form-container',
      decoration: 'deals-contact-decoration',
      image: 'deals-clerk-decoration-image',
      form: 'deals-contact-form',
      formTitle: 'deals-form-title',
      formGroup: 'deals-form-group',
      checkboxGroup: 'deals-checkbox-group',
      errorMessage: 'deals-error-message',
      submitButton: 'deals-submit-button',
    }}
  />
);
