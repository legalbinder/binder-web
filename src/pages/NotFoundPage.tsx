import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { InternalPage } from '../components/layout/InternalPage';
import { PageHead } from '../components/seo/PageHead';

export const NotFoundPage = () => {
  const location = useLocation();
  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Página no disponible', path: location.pathname },
  ];

  return (
    <>
      <PageHead
        title="Página no disponible | Binder"
        description="La página que buscas no existe o ya no está disponible en Binder."
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <InternalPage title="Página no disponible" breadcrumbs={breadcrumbs}>
        <p>
          La ruta que intentas abrir no existe, fue retirada o ya no está disponible.
        </p>
        <p>
          Si buscabas contactar a Binder, el formulario activo está en la página
          principal.
        </p>
        <p>
          <Link to="/">Volver al inicio</Link>
          {' · '}
          <a href="/#contacto">Ir al formulario de contacto</a>
        </p>
      </InternalPage>
    </>
  );
};
