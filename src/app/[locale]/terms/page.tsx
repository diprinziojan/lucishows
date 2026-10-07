import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('legal');

  const conditionItems: string[] = [
    t('terms.conditions.items.0'),
    t('terms.conditions.items.1'),
    t('terms.conditions.items.2'),
    t('terms.conditions.items.3'),
  ];

  const liabilityItems: string[] = [
    t('terms.liability.items.0'),
    t('terms.liability.items.1'),
    t('terms.liability.items.2'),
    t('terms.liability.items.3'),
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-text mb-2">
          {t('terms.title')}
        </h1>
        <p className="font-body text-sm text-gray-400 mb-8">{t('lastUpdated')}</p>
        <p className="font-body text-brand-text/80 mb-10 leading-relaxed">
          {t('terms.intro')}
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.owner.heading')}</h2>
          <p className="font-body text-brand-text/80 whitespace-pre-line leading-relaxed">{t('terms.owner.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.purpose.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('terms.purpose.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.conditions.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('terms.conditions.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {conditionItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.ip.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('terms.ip.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.liability.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('terms.liability.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {liabilityItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.links.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('terms.links.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.modifications.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('terms.modifications.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('terms.law.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('terms.law.text')}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
