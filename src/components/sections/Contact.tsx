import type { CSSProperties } from 'react';
import { LeadCaptureSection } from '../../shared/forms/lead-capture/LeadCaptureSection';
import './Contact.css';

export const Contact = () => (
  <LeadCaptureSection
    id="contacto"
    source="contact-form"
    webhookKind="homeContactForm"
    emptyChallengeValue="-"
    sectionStyle={{ '--section-bg': '#FFFFFF' } as CSSProperties}
    classes={{
      section: 'contact-section section-has-local-background',
      grid: 'contact-grid',
      text: 'contact-text',
      title: 'contact-title',
      description: 'contact-description',
      cta: 'contact-cta',
      formContainer: 'contact-form-container',
      decoration: 'contact-decoration',
      image: 'clerk-decoration-image',
      form: 'contact-form',
      formTitle: 'form-title',
      formGroup: 'form-group',
      checkboxGroup: 'checkbox-group',
      errorMessage: 'error-message',
      submitButton: 'submit-button',
    }}
  />
);
