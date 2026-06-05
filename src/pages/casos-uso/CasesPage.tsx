import {
  CasesComparison,
  CasesContact,
  CasesFAQ,
  CasesHero,
  CasesStats,
  CasesTabs,
  casesContent,
} from '../../features/casos-uso';
import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';

export const CasesPage = () => {
  const faqItems = casesContent.faq.items.map(item => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, '').trim()
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/casos-uso/gestion-procesos' },
    { label: 'Gestión de Procesos Legales', path: '/casos-uso/gestion-procesos' }
  ];

  return (
    <>
      <PageHead
        title="Gestión de Procesos Legales - Digitalización Legal | Binder"
        description="Digitaliza y controla tus procesos judiciales y administrativos. Centraliza expedientes, oficios y presentaciones con trazabilidad total."
        canonicalUrl="/casos-uso/gestion-procesos"
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
        <CasesHero />
        <CasesStats />
        <CasesTabs />
        <CasesComparison />
        <CasesFAQ />
        <CasesContact />
      </main>
    </>
  );
};

