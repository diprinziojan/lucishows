import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('legal');

  const dataCollectedItems: string[] = [
    t('privacy.dataCollected.items.0'),
    t('privacy.dataCollected.items.1'),
    t('privacy.dataCollected.items.2'),
    t('privacy.dataCollected.items.3'),
    t('privacy.dataCollected.items.4'),
  ];

  const purposeItems: string[] = [
    t('privacy.purposes.items.0'),
    t('privacy.purposes.items.1'),
    t('privacy.purposes.items.2'),
    t('privacy.purposes.items.3'),
  ];

  const legalBasisItems: string[] = [
    t('privacy.legalBasis.items.0'),
    t('privacy.legalBasis.items.1'),
    t('privacy.legalBasis.items.2'),
  ];

  const recipientItems: string[] = [
    t('privacy.recipients.items.0'),
    t('privacy.recipients.items.1'),
  ];

  const rightsItems: string[] = [
    t('privacy.rights.items.0'),
    t('privacy.rights.items.1'),
    t('privacy.rights.items.2'),
    t('privacy.rights.items.3'),
    t('privacy.rights.items.4'),
    t('privacy.rights.items.5'),
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-text mb-2">
          {t('privacy.title')}
        </h1>
        <p className="font-body text-sm text-gray-400 mb-8">{t('lastUpdated')}</p>
        <p className="font-body text-brand-text/80 mb-10 leading-relaxed">
          {t('privacy.intro')}
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.controller.heading')}</h2>
          <p className="font-body text-brand-text/80 whitespace-pre-line leading-relaxed">{t('privacy.controller.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.dataCollected.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('privacy.dataCollected.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {dataCollectedItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.purposes.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('privacy.purposes.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {purposeItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.legalBasis.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('privacy.legalBasis.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {legalBasisItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.recipients.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('privacy.recipients.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {recipientItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.rights.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('privacy.rights.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {rightsItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
          <p className="font-body text-brand-text/80 mt-3 leading-relaxed">{t('privacy.rights.howTo')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.retention.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('privacy.retention.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('privacy.authority.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('privacy.authority.text')}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
