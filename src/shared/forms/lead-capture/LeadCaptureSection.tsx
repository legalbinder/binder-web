import type { CSSProperties, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactoContent } from '../../../content/contacto';
import blockedEmailDomains from '../../../data/blockedEmailDomains.json';
import countriesData from '../../../data/countries.json';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import {
  getBubbleWebhookUrl,
  type BubbleFormOrigin,
} from '../../integrations/bubble/bubbleWebhooks';
import { PrivacyConsentLabel } from '../privacyConsent';
import { useLeadCaptureForm } from './useLeadCaptureForm';
import type { Country } from './leadCapture';
import './LeadCaptureSection.css';

interface LeadCaptureSectionClasses {
  section: string;
  grid: string;
  text: string;
  title: string;
  description: string;
  cta: string;
  formContainer: string;
  decoration: string;
  image: string;
  form: string;
  formTitle: string;
  formGroup: string;
  checkboxGroup: string;
  errorMessage: string;
  submitButton: string;
}

interface LeadCaptureSectionProps {
  id: string;
  classes: LeadCaptureSectionClasses;
  content?: typeof contactoContent;
  origen: Extract<
    BubbleFormOrigin,
    | 'formulario-contacto'
    | 'formulario-caso-procesos'
    | 'formulario-caso-clm'
    | 'formulario-caso-expediente'
    | 'formulario-caso-tally'
  >;
  emptyChallengeValue: string | null;
  sectionStyle?: CSSProperties;
}

export const LeadCaptureSection = ({
  id,
  classes,
  content = contactoContent,
  origen,
  emptyChallengeValue,
  sectionStyle,
}: LeadCaptureSectionProps) => {
  const navigate = useNavigate();
  const countries = countriesData.countries as Country[];
  const blockedDomains = blockedEmailDomains.blockedDomains as string[];
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useLeadCaptureForm({
    blockedDomains,
    countries,
    resolveWebhookUrl: getBubbleWebhookUrl,
    origen,
    emptyChallengeValue,
    onSuccess: () => navigate('/gracias'),
  });

  return (
    <section
      id={id}
      ref={elementRef as RefObject<HTMLElement>}
      className={`${classes.section} scroll-animate ${isVisible ? 'visible' : ''}`}
      style={sectionStyle}
    >
      <div className="container-wide">
        <div className={classes.grid}>
          <div className={classes.text}>
            <h2 className={classes.title}>{content.title}</h2>
            <p className={classes.description}>{content.description}</p>
            <p className={classes.cta}>{content.callToAction}</p>
          </div>

          <div className={classes.formContainer}>
            <div className={classes.decoration}>
              <img
                src="/Clerk-2.png"
                alt=""
                className={classes.image}
                role="presentation"
              />
            </div>
            <form onSubmit={handleSubmit} className={`${classes.form} lead-capture-form`}>
              <h3 className={classes.formTitle}>{content.form.title}</h3>

              <div className={classes.formGroup}>
                <input
                  type="text"
                  placeholder={content.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className={classes.errorMessage}>{errors.name}</span>}
              </div>

              <div className={classes.formGroup}>
                <input
                  type="text"
                  placeholder={content.form.fields.company.placeholder}
                  value={formData.company}
                  onChange={(event) => handleChange('company', event.target.value)}
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && (
                  <span className={classes.errorMessage}>{errors.company}</span>
                )}
              </div>

              <div className={classes.formGroup}>
                <input
                  type="email"
                  placeholder={content.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className={classes.errorMessage}>{errors.email}</span>}
              </div>

              <div className={classes.formGroup}>
                <div className="phone-input-wrapper">
                  <select
                    className="phone-country-select"
                    value={formData.phoneCountry}
                    onChange={(event) => handleChange('phoneCountry', event.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.dialCode}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder={content.form.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    className="phone-number-input"
                  />
                </div>
              </div>

              <div className={classes.formGroup}>
                <select
                  value={formData.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                  className={formData.message ? '' : 'placeholder-selected'}
                >
                  <option value="" disabled>
                    {content.form.fields.message.placeholder}
                  </option>
                  {content.form.fields.message.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`${classes.formGroup} ${classes.checkboxGroup} lead-capture-checkbox-group`}
              >
                <label className="lead-capture-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(event) => handleChange('consent', event.target.checked)}
                    className="lead-capture-checkbox-input"
                  />
                  <span className="lead-capture-checkbox-text">
                    <PrivacyConsentLabel />
                  </span>
                </label>
                {errors.consent && (
                  <span className={classes.errorMessage}>{errors.consent}</span>
                )}
              </div>

              {errors.submit && (
                <div className={classes.formGroup}>
                  <span className={classes.errorMessage}>{errors.submit}</span>
                </div>
              )}

              <button type="submit" className={classes.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : content.form.submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
