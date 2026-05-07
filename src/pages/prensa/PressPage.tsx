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
        <div className="press-hero__content">
          <div className="press-eyebrow">
            <span className="press-eyebrow__dot" />
            Prensa
          </div>
          <h1 id="press-title">
            Binder en los <em>medios</em>
          </h1>
          <p>
            Todo lo que medios, prensa especializada y líderes del sector están diciendo sobre
            Binder y la transformación del trabajo legal en Latinoamérica.
          </p>
        </div>
      </div>
    </section>

    <PressMediaBar />

    <section className="press-stories-wrap" aria-label="Historias de prensa">
      <div className="press-container">
        <div className="press-stories-label">Últimas historias</div>
        <div className="press-stories">
          {pressStories.map((story, index) => (
            <article
              className={`press-story-card press-story-card--tone-${index + 1} ${
                index % 2 === 1 ? 'press-story-card--reverse' : ''
              }`}
              key={story.slug}
            >
              <Link className="press-story-card__image" to={`/prensa/${story.slug}`}>
                <img src={story.image} alt={story.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
                <span className="press-story-card__scrim" aria-hidden="true" />
                <span className="press-story-card__dots" aria-hidden="true" />
                <span className="press-story-card__visual-stat">
                  <strong>{story.heroStat.value}</strong>
                  <span>{story.heroStat.label}</span>
                </span>
                <span className="press-story-card__visual-badges" aria-hidden="true">
                  {story.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </span>
              </Link>

              <div className="press-story-card__content">
                <Link className="press-story-card__content-card" to={`/prensa/${story.slug}`}>
                  <div className="press-story-card__meta">
                    <span className={`press-card-tag ${story.tag === 'Investigación' ? 'secondary' : ''}`}>
                      {story.tag}
                    </span>
                    <span className="press-card-date">{story.dateLabel}</span>
                  </div>
                  <h2>{story.title}</h2>
                  <p>{story.description}</p>
                </Link>

                <div className="press-story-card__sources">
                  <span>En:</span>
                  <div className="press-story-card__source-list">
                    {story.coverage.map((item) => (
                      <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.outlet}
                      </a>
                    ))}
                  </div>
                </div>

                <Link className="press-story-card__read" to={`/prensa/${story.slug}`}>
                  Leer historia completa →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <PressContactBlock />
      </div>
    </section>
  </main>
);
