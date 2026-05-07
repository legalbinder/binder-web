import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { pressMediaOutlets } from '../../content/prensa';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export const PressMediaBar = () => (
  <section className="press-media-bar" aria-label="Medios destacados">
    <div className="press-media-bar__track">
      <div className="press-media-bar__logos">
        {pressMediaOutlets.map((outlet) => (
          <a
            key={outlet.name}
            href={outlet.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir cobertura en ${outlet.name}`}
            title={outlet.name}
          >
            <img src={outlet.logo} alt={outlet.name} loading="lazy" />
          </a>
        ))}

        {pressMediaOutlets.map((outlet) => (
          <a
            key={`${outlet.name}-loop`}
            href={outlet.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden="true"
            tabIndex={-1}
            title={outlet.name}
          >
            <img src={outlet.logo} alt="" loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export const PressContactBlock = () => (
  <section className="press-contact" aria-labelledby="press-contact-title">
    <div>
      <h2 id="press-contact-title">¿Quieres conocer el impacto para tu equipo legal?</h2>
      <p>
        Binder ayuda a equipos legales a ordenar procesos, centralizar información y reducir
        trabajo operativo sin perder control jurídico.
      </p>
    </div>
    <div className="press-contact__actions">
      <Link className="press-button press-button--primary" to="/contacto">
        Contactar a Binder
      </Link>
      <Link className="press-button press-button--secondary" to="/diagnostico-legal-ops-formulario-inicio">
        Diagnóstico Legal Ops
      </Link>
    </div>
  </section>
);
