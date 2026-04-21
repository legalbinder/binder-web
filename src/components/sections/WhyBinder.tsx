import { useCallback, useEffect, useState } from 'react';
import { whyBinderContent } from '../../content/porquebinder';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './WhyBinder.css';

interface IconPosition {
  top: number;
  left: number;
}

const allEmojis = ['📧', '📄', '⏱️', '💬', '📱', '📋', '📝', '📑', '📈', '📌', '📦', '📎', '🔖'];

export const WhyBinder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
  const [popKey, setPopKey] = useState(0);
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]);
  const { slides, autoAdvanceSeconds } = whyBinderContent;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const generateRandomPositions = (): IconPosition[] => {
    const iconCount = 5;
    const positions: IconPosition[] = [];
    const centerLeftStart = 25;
    const centerLeftEnd = 75;
    const centerTopStart = 30;
    const centerTopEnd = 70;

    for (let index = 0; index < iconCount; index++) {
      let top = 0;
      let left = 0;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        top = 5 + Math.random() * 90;
        left = 5 + Math.random() * 90;
        attempts++;

        const isInCenter =
          left >= centerLeftStart &&
          left <= centerLeftEnd &&
          top >= centerTopStart &&
          top <= centerTopEnd;

        if (!isInCenter || attempts >= maxAttempts) {
          break;
        }
      } while (attempts < maxAttempts);

      positions.push({ top, left });
    }

    return positions;
  };

  const getRandomEmojis = useCallback((): string[] => {
    const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  useEffect(() => {
    setIconPositions(generateRandomPositions());
    setCurrentEmojis(getRandomEmojis());
  }, [getRandomEmojis]);

  useEffect(() => {
    setIconPositions(generateRandomPositions());
    setCurrentEmojis(getRandomEmojis());
    setPopKey((previous) => previous + 1);
  }, [currentSlide, getRandomEmojis]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, autoAdvanceSeconds * 1000);

    return () => clearInterval(interval);
  }, [autoAdvanceSeconds, isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((previous) => (previous - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="porquebinder"
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`why-binder-section section-has-local-background scroll-animate ${isVisible ? 'visible' : ''}`}
      style={{ '--section-bg': '#FFFFFF' } as React.CSSProperties}
    >
      <div className="container">
        <div
          className="why-binder-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="why-binder-solapa"></div>
          <div className="floating-icons">
            {iconPositions.map((position, index) => (
              <div
                key={`${popKey}-${index}`}
                className="icon-placeholder"
                style={{
                  top: `${position.top}%`,
                  left: `${position.left}%`,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {currentEmojis[index]}
              </div>
            ))}
          </div>

          <div className="carousel-content">
            <div className="slides-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <p className="slide-question">{slide.question}</p>
                  <h2 className="slide-headline">{slide.headline}</h2>
                  <p className="slide-support">
                    {slide.support
                      .split('Binder une todo lo legal en un solo espacio')
                      .map((part, partIndex, array) =>
                        partIndex === array.length - 1 ? (
                          <span key={partIndex}>{part}</span>
                        ) : (
                          <span key={partIndex}>
                            {part}
                            <strong style={{ color: '#96EFFF' }}>
                              Binder une todo lo legal en un solo espacio
                            </strong>
                          </span>
                        )
                      )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow-prev"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          className="carousel-arrow carousel-arrow-next"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          ›
        </button>

        <div className="carousel-indicators">
          <button
            className="carousel-nav-button carousel-nav-prev"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            ‹
          </button>
          <div className="indicators-wrapper">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-nav-button carousel-nav-next"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};
