import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { LeadCaptureSection } from '../../../shared/forms/lead-capture/LeadCaptureSection';
import { tallyContent } from '../content/tally';
import './TallyLanding.css';

const tallyContactClasses = {
  section: 'tally-contact-section',
  grid: 'tally-contact-grid',
  text: 'tally-contact-text',
  title: 'tally-contact-title',
  description: 'tally-contact-description',
  cta: 'tally-contact-cta',
  formContainer: 'tally-contact-form-container',
  decoration: 'tally-contact-decoration',
  image: 'tally-clerk-decoration-image',
  form: 'tally-contact-form',
  formTitle: 'tally-form-title',
  formGroup: 'tally-form-group',
  checkboxGroup: 'tally-checkbox-group',
  errorMessage: 'tally-error-message',
  submitButton: 'tally-submit-button',
};

const scrollToContact = () => {
  document.getElementById('tally-contact')?.scrollIntoView({ behavior: 'smooth' });
};

const TallyHero = () => {
  const { hero } = tallyContent;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-hero-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="tally-hero-left">
        <div className="tally-hero-content">
          <div className="tally-hero-icon-wrapper">
            <img src={hero.logo} alt="" className="tally-hero-icon" />
            <span className="tally-hero-name">{hero.product}</span>
          </div>
          <h1 className="tally-hero-title">{hero.title}</h1>
          <p className="tally-hero-subtitle">{hero.subtitle}</p>
          <div className="tally-hero-cta">
            <Button variant="primary" onClick={scrollToContact}>
              {hero.ctaText}
            </Button>
          </div>
        </div>
      </div>
      <div className="tally-hero-right">
        <img src={hero.image} alt="" className="tally-hero-image" />
      </div>
    </section>
  );
};

const TallyStats = () => {
  const { title, items, description } = tallyContent.stats;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-stats-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="tally-stats-title">{title}</h2>
        <div className="tally-stats-grid">
          {items.map((item) => (
            <div key={item.value} className="tally-stat-block">
              <div className="tally-stat-number">
                <span className="tally-stat-value">{item.value}</span>
              </div>
              <p className="tally-stat-text">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="tally-stats-description">{description}</p>
      </div>
    </section>
  );
};

const TallyTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set([0]));
  const tabNavigationRef = useRef<HTMLDivElement>(null);
  const { title, description, items } = tallyContent.solution;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenAccordions((previous) => {
      const next = new Set(previous);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-tabs-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="tally-tabs-background" />

      <div className="container-wide">
        <h2 className="tally-tabs-main-title">{title}</h2>
        <p className="tally-tabs-subtitle">{description}</p>

        {!isMobile && (
          <div className="tally-tabs-navigation" ref={tabNavigationRef}>
            {items.map((item, index) => (
              <button
                key={item.id}
                className={`tally-tab-button ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}

        {!isMobile && (
          <div className="tally-tab-content-container">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`tally-tab-content ${index === activeTab ? 'active' : ''}`}
                data-tab-id={item.id}
              >
                <div className="tally-tab-grid">
                  <div className="tally-tab-image">
                    <img src={item.image} alt="" className="tally-tab-image-content" />
                    <img
                      src={item.mockup}
                      alt=""
                      className={`tally-tab-image-content tally-tab-demo-image tally-tab-demo-image--${item.mockupPosition}`}
                    />
                  </div>

                  <div className="tally-tab-text">
                    <h3 className="tally-tab-title">{item.title}</h3>
                    <p className="tally-tab-subtitle">{item.description}</p>
                    <p className="tally-tab-description">{item.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <div className="tally-accordion-container">
            {items.map((item, index) => {
              const isOpen = openAccordions.has(index);

              return (
                <div key={item.id} className="tally-accordion-item" data-tab-id={item.id}>
                  <button
                    className={`tally-accordion-button ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="tally-accordion-title">{item.title}</span>
                    <span className="tally-accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className={`tally-accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="tally-accordion-grid">
                      <div className="tally-accordion-image">
                        <img src={item.image} alt="" className="tally-tab-image-content" />
                        <img
                          src={item.mockup}
                          alt=""
                          className={`tally-tab-image-content tally-tab-demo-image tally-tab-demo-image--${item.mockupPosition}`}
                        />
                      </div>

                      <div className="tally-accordion-text">
                        <h3 className="tally-tab-title">{item.title}</h3>
                        <p className="tally-tab-subtitle">{item.description}</p>
                        <p className="tally-tab-description">{item.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const TallyComparison = () => {
  const { title, traditionalHeader, tallyHeader, rows } = tallyContent.comparison;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-comparison-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="tally-comparison-title">{title}</h2>

        <div className="tally-comparison-table-container">
          <table className="tally-comparison-table">
            <thead>
              <tr>
                <th className="tally-comparison-traditional-header">{traditionalHeader}</th>
                <th className="tally-comparison-tally-header">
                  <div className="tally-comparison-tally-tab" />
                  {tallyHeader}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.traditional} className="tally-comparison-row">
                  <td className="tally-comparison-traditional">{row.traditional}</td>
                  <td className="tally-comparison-tally">{row.tally}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const TallyAudienceUseCases = () => {
  const { audiences, useCases } = tallyContent;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-use-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <div className="tally-use-grid">
          <div className="tally-use-panel tally-use-panel--primary">
            <h2>{audiences.title}</h2>
            <p>{audiences.description}</p>
            <div className="tally-audience-list">
              {audiences.items.map((item) => (
                <article key={item.role}>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="tally-use-panel">
            <h2>{useCases.title}</h2>
            <div className="tally-use-case-list">
              {useCases.items.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TallyReminder = () => {
  const { reminder } = tallyContent;
  const [beforeHighlight, afterHighlight] = reminder.description.split(
    reminder.descriptionHighlight
  );
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-reminder-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <div className="tally-reminder-card">
          <h2>{reminder.title}</h2>
          <p>
            {beforeHighlight}
            <strong className="tally-reminder-highlight">
              {reminder.descriptionHighlight}
            </strong>
            {afterHighlight}
          </p>
          <strong className="tally-reminder-outcome">{reminder.outcome}</strong>
        </div>
      </div>
    </section>
  );
};

const TallyFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set([tallyContent.faq.items[0]?.id ?? ''])
  );
  const { title, items } = tallyContent.faq;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`tally-faq-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="tally-faq-title">{title}</h2>

        <div className="tally-faq-container">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);

            return (
              <div key={item.id} className="tally-faq-item">
                <button
                  className={`tally-faq-button ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="tally-faq-question">{item.question}</span>
                  <span className="tally-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`tally-faq-answer ${isOpen ? 'open' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TallyContact = () => (
  <LeadCaptureSection
    id="tally-contact"
    origen="formulario-caso-tally"
    emptyChallengeValue={null}
    content={tallyContent.contact}
    classes={tallyContactClasses}
  />
);

export const TallyLanding = () => (
  <>
    <TallyHero />
    <TallyStats />
    <TallyTabs />
    <TallyComparison />
    <TallyAudienceUseCases />
    <TallyReminder />
    <TallyFAQ />
    <TallyContact />
  </>
);
