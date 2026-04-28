import { Fragment, useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getEventBySlug } from '../../content/eventos';
import blockedEmailDomains from '../../data/blockedEmailDomains.json';
import countriesData from '../../data/countries.json';
import {
  CORPORATE_EMAIL_REQUIRED_MESSAGE,
  getEmailDomain,
  isBlockedPersonalEmailDomain,
} from '../../utils/corporateEmailValidation';
import {
  type EventoCierreBubblePayload,
  getBubbleWebhookUrl,
} from '../../utils/eventoCierreBubble';
import { postBubbleWorkflow } from '../../utils/bubbleWorkflowRequest';
import {
  formatLeadCapturePhone,
  normalizeLeadCaptureEmail,
  type Country,
} from '../../utils/leadCapture';
import { trackGoogleEvent } from '../../utils/tracking';
import './EventPage.css';

const SITE_URL = 'https://binder.la';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  phoneCountry: string;
  phone: string;
  consent: boolean;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  jobTitle?: string;
  company?: string;
  consent?: string;
  submit?: string;
}

function WebinarPartnerLogos() {
  return (
    <>
      <Link to="/" aria-label="Binder - inicio">
        <img src="/lightmode_default.svg" alt="Binder" className="ev-logo-binder" />
      </Link>
      <img src="/imgs-webinar/niubox_logo.png" alt="Niubox" className="ev-logo-niubox-img" />
      <div className="ev-logo-nexum-wrap" aria-label="Nexum">
        <img src="/imgs-webinar/nexum_logo.png" alt="Nexum" className="ev-logo-nexum-img" />
      </div>
    </>
  );
}

export function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = useMemo(() => getEventBySlug(slug), [slug]);
  const countries = countriesData.countries as Country[];
  const blockedDomains = blockedEmailDomains.blockedDomains as string[];
  const defaultCountry = countries.find((country) => country.code === 'PE') ?? countries[0];
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    company: '',
    phoneCountry: defaultCountry.code,
    phone: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const canonicalPath = slug ? `/eventos/${slug}` : '';
  const fullUrl = `${SITE_URL}${canonicalPath}`;

  useEffect(() => {
    const htmlElement = document.documentElement;
    const previousStyles = {
      maxWidth: htmlElement.style.maxWidth,
      maxHeight: htmlElement.style.maxHeight,
      overflow: htmlElement.style.overflow,
    };

    htmlElement.style.removeProperty('max-width');
    htmlElement.style.removeProperty('max-height');
    htmlElement.style.removeProperty('overflow');

    return () => {
      if (previousStyles.maxWidth) htmlElement.style.maxWidth = previousStyles.maxWidth;
      if (previousStyles.maxHeight) htmlElement.style.maxHeight = previousStyles.maxHeight;
      if (previousStyles.overflow) htmlElement.style.overflow = previousStyles.overflow;
    };
  }, []);

  const validate = useCallback((): boolean => {
    const nextErrors: FieldErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'El nombre es requerido';
    if (!form.lastName.trim()) nextErrors.lastName = 'El apellido es requerido';

    const email = form.email.trim();
    if (!email) {
      nextErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Correo inválido';
    } else {
      const domain = getEmailDomain(email);
      if (domain && isBlockedPersonalEmailDomain(domain, blockedDomains)) {
        nextErrors.email = CORPORATE_EMAIL_REQUIRED_MESSAGE;
      }
    }

    if (!form.jobTitle.trim()) nextErrors.jobTitle = 'El cargo es requerido';
    if (!form.company.trim()) nextErrors.company = 'La empresa es requerida';
    if (!form.consent) nextErrors.consent = 'Debes aceptar para continuar';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [blockedDomains, form]);

  const handleSubmit = async (eventSubmit: FormEvent) => {
    eventSubmit.preventDefault();

    if (!event || !validate()) {
      return;
    }

    setSubmitting(true);
    setErrors((previous) => ({ ...previous, submit: undefined }));

    const phone = formatLeadCapturePhone(countries, form.phoneCountry, form.phone) ?? '';
    const requestBody: EventoCierreBubblePayload = {
      Nombres: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: normalizeLeadCaptureEmail(form.email),
      jobTitle: form.jobTitle.trim(),
      company: form.company.trim(),
      phone,
      phoneCountry: form.phoneCountry,
      consent: form.consent,
      timestamp: new Date().toISOString(),
      source: 'event-registration',
      eventSlug: event.slug,
    };

    try {
      await postBubbleWorkflow(getBubbleWebhookUrl('eventRegistrationForm'), requestBody);
      setSuccess(true);
      trackGoogleEvent('generate_lead', {
        event_category: 'evento',
        event_label: event.slug,
      });
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? `No se pudo enviar tu registro. ${error.message}`
            : 'No se pudo enviar tu registro por un error de red. Intenta nuevamente en unos minutos.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (field: keyof FormState, value: string | boolean) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    const errorKey = field as keyof FieldErrors;

    if (errors[errorKey]) {
      setErrors((previous) => ({ ...previous, [errorKey]: undefined }));
    }
  };

  const scrollToRegister = useCallback(() => {
    const registerSection = document.getElementById('registro');
    if (!registerSection) return;
    registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!event) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{event.seoTitle}</title>
        <meta name="description" content={event.seoDescription} />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={event.seoTitle} />
        <meta property="og:description" content={event.seoDescription} />
        <meta property="og:site_name" content="Binder" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={event.seoTitle} />
        <meta name="twitter:description" content={event.seoDescription} />
      </Helmet>

      <div className="ev">
        <section className="ev-hero">
          <header className="ev-hero-toolbar-mobile">
            <div className="ev-hero-toolbar-mobile-inner">
              <Link to="/" aria-label="Binder - inicio">
                <img
                  src="/lightmode_default.svg"
                  alt="Binder"
                  className="ev-logo-binder ev-logo-binder--toolbar"
                />
              </Link>
              <span className="ev-hero-toolbar-date" aria-label="Fecha y hora del evento">
                {event.toolbarDateTime}
              </span>
              <button
                type="button"
                className="ev-hero-toolbar-register-btn"
                onClick={scrollToRegister}
              >
                Inscríbete
              </button>
            </div>
          </header>

          <div className="ev-hero-left">
            <div className="ev-hero-left-surface">
              <div className="ev-hero-left-purple">
                <div className="ev-hero-left-content">
                  <div className="ev-hero-content">
                    <div className="ev-hero-content-stack">
                      <div className="ev-hero-content-inner">
                        <div className="ev-logo-bar ev-logo-bar--hero-inner">
                          <WebinarPartnerLogos />
                        </div>
                        <video
                          className="ev-video-bg ev-video-bg--hero-inner"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          aria-hidden
                        >
                          <source src="/videos/videobackground.mp4" type="video/mp4" />
                        </video>
                        <div className="ev-hero-main">
                          <div className="ev-badge">{event.badgeText.toUpperCase()}</div>
                          <h1 className="ev-title">
                            <span className="ev-title-main">
                              {event.titleLine1Before}
                              {event.titleLine1Highlight}
                              {event.titleLine1After}
                            </span>
                            <span className="ev-title-sub">{event.titleLine2}</span>
                          </h1>

                          <p className="ev-title-lead">{event.description}</p>

                          <div className="ev-speakers-row">
                            {event.speakers.map((speaker) => (
                              <div key={speaker.name} className="ev-speaker-item">
                                <div className="ev-speaker-photo">
                                  {speaker.avatarUrl ? (
                                    <img src={speaker.avatarUrl} alt="" />
                                  ) : (
                                    speaker.initials
                                  )}
                                </div>
                                <div className="ev-speaker-info">
                                  <div className="ev-speaker-name">
                                    {speaker.name.toUpperCase()}
                                  </div>
                                  <div className="ev-speaker-role">{speaker.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ev-hero-right" id="registro">
            <div className="ev-hero-right-inner">
              <div className="ev-sponsor-bar">
                <img
                  src="/imgs-webinar/minprod_logo.png"
                  alt="PERÚ - Ministerio de la Producción"
                  className="ev-logo-minprod"
                />
                <img
                  src="/imgs-webinar/proinnovate_logo.png"
                  alt="ProInnovate"
                  className="ev-logo-proinnovate"
                />
              </div>

              <div className="ev-hero-right-body">
                <div className="ev-form-card">
                  <p className="ev-form-heading">{event.formHeading}</p>
                  <p className="ev-form-sub">
                    {event.formSubtext}
                    {event.formSubtextStrong && <strong>{event.formSubtextStrong}</strong>}
                  </p>

                  {success ? (
                    <div className="ev-form-success">
                      <div className="ev-form-success-icon" aria-hidden>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h2 className="ev-form-success-title">¡Te has registrado correctamente!</h2>
                      <p className="ev-form-success-text">
                        Revisa tu correo para los siguientes pasos. Si no ves el mensaje,
                        revisa spam o promociones.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="ev-form-grid">
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre *"
                            value={form.firstName}
                            onChange={(e) => setField('firstName', e.target.value)}
                            className={errors.firstName ? 'ev-input-error' : ''}
                            autoComplete="given-name"
                            aria-invalid={!!errors.firstName}
                          />
                          {errors.firstName && (
                            <div className="ev-field-error">{errors.firstName}</div>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Apellido *"
                            value={form.lastName}
                            onChange={(e) => setField('lastName', e.target.value)}
                            className={errors.lastName ? 'ev-input-error' : ''}
                            autoComplete="family-name"
                            aria-invalid={!!errors.lastName}
                          />
                          {errors.lastName && (
                            <div className="ev-field-error">{errors.lastName}</div>
                          )}
                        </div>
                        <div className="ev-form-full">
                          <input
                            type="email"
                            placeholder="Email corporativo *"
                            value={form.email}
                            onChange={(e) => setField('email', e.target.value)}
                            className={errors.email ? 'ev-input-error' : ''}
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                          />
                          {errors.email && <div className="ev-field-error">{errors.email}</div>}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Cargo *"
                            value={form.jobTitle}
                            onChange={(e) => setField('jobTitle', e.target.value)}
                            className={errors.jobTitle ? 'ev-input-error' : ''}
                            autoComplete="organization-title"
                            aria-invalid={!!errors.jobTitle}
                          />
                          {errors.jobTitle && (
                            <div className="ev-field-error">{errors.jobTitle}</div>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Empresa *"
                            value={form.company}
                            onChange={(e) => setField('company', e.target.value)}
                            className={errors.company ? 'ev-input-error' : ''}
                            autoComplete="organization"
                            aria-invalid={!!errors.company}
                          />
                          {errors.company && (
                            <div className="ev-field-error">{errors.company}</div>
                          )}
                        </div>
                        <div className="ev-phone-row">
                          <select
                            className="ev-phone-country"
                            value={form.phoneCountry}
                            onChange={(e) => setField('phoneCountry', e.target.value)}
                            aria-label="Código de país"
                          >
                            {countries.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.dialCode}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="ev-phone-number"
                            placeholder="Teléfono (solo números)"
                            value={form.phone}
                            onChange={(e) =>
                              setField('phone', e.target.value.replace(/\D/g, ''))
                            }
                            autoComplete="tel-national"
                          />
                        </div>
                        <div className="ev-consent ev-form-full">
                          <input
                            id="event-consent-checkbox"
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => setField('consent', e.target.checked)}
                          />
                          <label htmlFor="event-consent-checkbox">
                            Acepto el tratamiento de mis datos según la{' '}
                            <Link
                              to="/legal/privacidad"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              política de privacidad
                            </Link>
                            .
                          </label>
                        </div>
                        {errors.consent && (
                          <div className="ev-field-error ev-form-full">{errors.consent}</div>
                        )}
                      </div>

                      {errors.submit && <p className="ev-form-error" role="alert">{errors.submit}</p>}

                      <button type="submit" className="ev-cta-btn" disabled={submitting}>
                        {submitting ? 'Enviando...' : event.ctaText}
                      </button>

                      {event.formNoteHtml && (
                        <p
                          className="ev-form-note"
                          dangerouslySetInnerHTML={{ __html: event.formNoteHtml }}
                        />
                      )}
                    </form>
                  )}
                </div>

                <div className="ev-divider" />

                <div className="ev-info-row">
                  <div className="ev-info-card">
                    <div className="ev-info-icon" aria-hidden>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <div className="ev-info-title">{event.infoDateTitle}</div>
                      <div className="ev-info-sub">{event.infoTimeText}</div>
                    </div>
                  </div>

                  <div className="ev-info-divider" />

                  <div className="ev-info-card">
                    <div className="ev-info-icon" aria-hidden>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </div>
                    <div>
                      <div className="ev-info-title">{event.infoLocationTitle}</div>
                      <div className="ev-info-sub">{event.infoLocationSub}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="ev-footer">
          <div className="ev-footer-logos">
            {event.footerLogos.map((logo, index) => (
              <Fragment key={logo}>
                {index > 0 ? <div className="ev-footer-sep" aria-hidden /> : null}
                <span className="ev-footer-logo">{logo}</span>
              </Fragment>
            ))}
          </div>
          <div className="ev-footer-note">{event.footerNote}</div>
        </footer>
      </div>
    </>
  );
}
