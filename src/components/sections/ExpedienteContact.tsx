import { LeadCaptureSection } from '../../shared/forms/lead-capture/LeadCaptureSection';
import './ExpedienteContact.css';

export const ExpedienteContact = () => (
  <LeadCaptureSection
    id="expediente-contact"
    source="expediente-contact-form"
    webhookKind="useCasesAndDiagnosisForm"
    emptyChallengeValue={null}
    classes={{
      section: 'expediente-contact-section',
      grid: 'expediente-contact-grid',
      text: 'expediente-contact-text',
      title: 'expediente-contact-title',
      description: 'expediente-contact-description',
      cta: 'expediente-contact-cta',
      formContainer: 'expediente-contact-form-container',
      decoration: 'expediente-contact-decoration',
      image: 'expediente-clerk-decoration-image',
      form: 'expediente-contact-form',
      formTitle: 'expediente-form-title',
      formGroup: 'expediente-form-group',
      checkboxGroup: 'expediente-checkbox-group',
      errorMessage: 'expediente-error-message',
      submitButton: 'expediente-submit-button',
    }}
  />
);
