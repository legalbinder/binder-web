import { LeadCaptureSection } from '../../shared/forms/lead-capture/LeadCaptureSection';
import './CasesContact.css';

export const CasesContact = () => (
  <LeadCaptureSection
    id="cases-contact"
    source="cases-contact-form"
    webhookKind="useCasesAndDiagnosisForm"
    emptyChallengeValue={null}
    classes={{
      section: 'cases-contact-section',
      grid: 'cases-contact-grid',
      text: 'cases-contact-text',
      title: 'cases-contact-title',
      description: 'cases-contact-description',
      cta: 'cases-contact-cta',
      formContainer: 'cases-contact-form-container',
      decoration: 'cases-contact-decoration',
      image: 'cases-clerk-decoration-image',
      form: 'cases-contact-form',
      formTitle: 'cases-form-title',
      formGroup: 'cases-form-group',
      checkboxGroup: 'cases-checkbox-group',
      errorMessage: 'cases-error-message',
      submitButton: 'cases-submit-button',
    }}
  />
);
