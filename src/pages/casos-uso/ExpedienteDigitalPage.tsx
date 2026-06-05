import {
  ExpedienteComparison,
  ExpedienteContact,
  ExpedienteFAQ,
  ExpedienteHero,
  ExpedienteStats,
  ExpedienteTabs,
  expedienteDigitalContent,
} from '../../features/casos-uso';
import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';

export const ExpedienteDigitalPage = () => {
  const faqItems = expedienteDigitalContent.faq.items.map(item => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, '').trim()
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/casos-uso/expediente-digital' },
    { label: 'Expediente Digital y Mesa de Partes', path: '/casos-uso/expediente-digital' }
  ];

  return (
    <>
      <PageHead
        title="Expediente Digital y Mesa de Partes Online | Binder"
        description="Mesa de partes online que automatiza, controla y mide tu operación jurídica. Convierte trabajo operativo en procesos claros y trazables."
        canonicalUrl="/casos-uso/expediente-digital"
      />
      <SchemaMarkup 
        type="faqPage" 
        data={{ faqItems }}
      />
      <SchemaMarkup 
        type="breadcrumbList" 
        data={{ breadcrumbs }}
      />
      <main>
        <ExpedienteHero />
        <ExpedienteStats />
        <ExpedienteTabs />
        <ExpedienteComparison />
        <ExpedienteFAQ />
        <ExpedienteContact />
      </main>
    </>
  );
};

