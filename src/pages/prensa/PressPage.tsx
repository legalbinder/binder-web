import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { PageHead } from '../../components/seo/PageHead';
import { pressStories } from '../../content/prensa';
import { JsonLd, PressContactBlock, PressMediaBar } from './PressComponents';
import './Press.css';

const siteUrl = 'https://binder.la';

const pressPageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Prensa',
        item: `${siteUrl}/prensa`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Binder en los medios',
    description:
      'Cobertura de prensa sobre Binder, inteligencia artificial, legal operations y transformación del trabajo legal en Latinoamérica.',
    url: `${siteUrl}/prensa`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: pressStories.map((story, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/prensa/${story.slug}`,
        name: story.title,
      })),
    },
  },
];

export const PressPage = () => (
  <main className="press-page section-has-local-background">
    <PageHead
      title="Binder en los medios | Prensa y cobertura legal tech"
      description="Cobertura de prensa sobre Binder, inteligencia artificial, Legal Ops y transformación del trabajo legal en Latinoamérica."
      canonicalUrl="/prensa"
      ogImage="/prensa/images/story-ia-gestion-legal.png"
    />
    <JsonLd data={pressPageSchema} />

    <section className="press-hero" aria-labelledby="press-title">
      <div className="press-container">
        <Breadcrumbs
          items={[
            { label: 'Inicio', path: '/' },
            { label: 'Prensa', path: '/prensa' },
          ]}
        />
        <div className="press-hero__layout">
          <div className="press-hero__content">
            <h1 id="press-title">Binder en los medios</h1>
            <p>
              Todo lo que medios, prensa especializada y líderes del sector están diciendo sobre
              Binder y la transformación del trabajo legal en Latinoamérica.
            </p>
          </div>

          <aside className="press-hero__panel" aria-label="Resumen de cobertura">
            <div>
              <strong>4</strong>
              <span>historias publicadas</span>
            </div>
            <div>
              <strong>8</strong>
              <span>medios con cobertura</span>
            </div>
            <div>
              <strong>2026</strong>
              <span>cobertura especializada</span>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <div className="press-container">
      <PressMediaBar />

      <section className="press-stories" aria-label="Historias de prensa">
        {pressStories.map((story, index) => (
          <article
            className={`press-story-card ${index % 2 === 1 ? 'press-story-card--reverse' : ''}`}
            key={story.slug}
          >
            <Link className="press-story-card__image" to={`/prensa/${story.slug}`}>
              <img src={story.image} alt={story.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
            </Link>

            <div className="press-story-card__body">
              <div className="press-story-card__meta">
                <span>{story.tag}</span>
                <span>{story.dateLabel}</span>
              </div>
              <h2>
                <Link to={`/prensa/${story.slug}`}>{story.title}</Link>
              </h2>
              <p>{story.description}</p>

              <div className="press-story-card__stat" aria-label={story.heroStat.label}>
                <strong>{story.heroStat.value}</strong>
                <span>{story.heroStat.label}</span>
              </div>

              <div className="press-story-card__badges" aria-label="Medios">
                {story.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>

              <div className="press-story-card__footer">
                <Link className="press-link" to={`/prensa/${story.slug}`}>
                  Leer historia
                </Link>
                <span>{story.coverage.length} cobertura{story.coverage.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <PressContactBlock />
    </div>
  </main>
);
