import { useNavigate } from 'react-router-dom';
import { contactoContent } from '../../content/contacto';
import blockedEmailDomains from '../../data/blockedEmailDomains.json';
import countriesData from '../../data/countries.json';
import { useLeadCaptureForm } from '../../hooks/useLeadCaptureForm';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getBubbleWebhookUrl } from '../../utils/eventoCierreBubble';
import type { Country } from '../../utils/leadCapture';
import './ExpedienteContact.css';

export const ExpedienteContact = () => {
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
    resolveWebhookUrl: () => getBubbleWebhookUrl('generalLead'),
    source: 'expediente-contact-form',
    emptyChallengeValue: null,
    onSuccess: () => navigate('/gracias'),
  });

  return (
    <section
      id="expediente-contact"
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`expediente-contact-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <div className="expediente-contact-grid">
          <div className="expediente-contact-text">
            <h2 className="expediente-contact-title">{contactoContent.title}</h2>
            <p className="expediente-contact-description">{contactoContent.description}</p>
            <p className="expediente-contact-cta">{contactoContent.callToAction}</p>
          </div>

          <div className="expediente-contact-form-container">
            <div className="expediente-contact-decoration">
              <img
                src="/Clerk-2.png"
                alt=""
                className="expediente-clerk-decoration-image"
                role="presentation"
              />
            </div>
            <form onSubmit={handleSubmit} className="expediente-contact-form">
              <h3 className="expediente-form-title">{contactoContent.form.title}</h3>

              <div className="expediente-form-group">
                <input
                  type="text"
                  placeholder={contactoContent.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <span className="expediente-error-message">{errors.name}</span>
                )}
              </div>

              <div className="expediente-form-group">
                <input
                  type="text"
                  placeholder={contactoContent.form.fields.company.placeholder}
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && (
                  <span className="expediente-error-message">{errors.company}</span>
                )}
              </div>

              <div className="expediente-form-group">
                <input
                  type="email"
                  placeholder={contactoContent.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="expediente-error-message">{errors.email}</span>
                )}
              </div>

              <div className="expediente-form-group">
                <div className="phone-input-wrapper">
                  <select
                    className="phone-country-select"
                    value={formData.phoneCountry}
                    onChange={(e) => handleChange('phoneCountry', e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.dialCode}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder={contactoContent.form.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="phone-number-input"
                  />
                </div>
              </div>

              <div className="expediente-form-group">
                <select
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={formData.message ? '' : 'placeholder-selected'}
                >
                  <option value="" disabled>
                    {contactoContent.form.fields.message.placeholder}
                  </option>
                  {contactoContent.form.fields.message.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="expediente-form-group expediente-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => handleChange('consent', e.target.checked)}
                  />
                  <span>{contactoContent.form.consent.text}</span>
                </label>
                {errors.consent && (
                  <span className="expediente-error-message">{errors.consent}</span>
                )}
              </div>

              {errors.submit && (
                <div className="expediente-form-group">
                  <span className="expediente-error-message">{errors.submit}</span>
                </div>
              )}

              <button
                type="submit"
                className="expediente-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : contactoContent.form.submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
