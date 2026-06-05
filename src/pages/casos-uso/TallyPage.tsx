import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';
import { TallyLanding, tallyContent } from '../../features/casos-uso';

export const TallyPage = () => {
  const faqItems = tallyContent.faq.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/soluciones' },
    { label: 'Gestión de tiempo y facturación', path: tallyContent.route },
  ];

  return (
    <>
      <PageHead
        title={tallyContent.seo.title}
        description={tallyContent.seo.description}
        canonicalUrl={tallyContent.route}
        ogImage="/images/tally/tally-hero.jpg"
      />
      <SchemaMarkup type="faqPage" data={{ faqItems }} />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />
      <main className="tally-page section-has-local-background">
        <TallyLanding />
      </main>
    </>
  );
};
