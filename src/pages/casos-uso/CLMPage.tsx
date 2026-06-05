import {
  DealsComparison,
  DealsContact,
  DealsFAQ,
  DealsHero,
  DealsStats,
  DealsTabs,
  dealsContent,
} from '../../features/casos-uso';
import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';

export const CLMPage = () => {
  const faqItems = dealsContent.faq.items.map(item => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, '').trim() // Remove any HTML tags
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/casos-uso/clm' },
    { label: 'CLM con IA', path: '/casos-uso/clm' }
  ];

  return (
    <>
      <PageHead
        title="CLM con IA - Gestión de Contratos | Binder"
        description="Solución CLM con IA para centralizar y automatizar el ciclo de vida de contratos. Redacción inteligente, firma electrónica y trazabilidad total."
        canonicalUrl="/casos-uso/clm"
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
        <DealsHero />
        <DealsStats />
        <DealsTabs />
        <DealsComparison />
        <DealsFAQ />
        <DealsContact />
      </main>
    </>
  );
};

