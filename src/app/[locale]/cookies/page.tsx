import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function CookiesPage() {
  const t = useTranslations('legal');

  const thirdPartyItems: string[] = [
    t('cookies.thirdParty.items.0'),
    t('cookies.thirdParty.items.1'),
  ];

  const manageItems: string[] = [
    t('cookies.manage.items.0'),
    t('cookies.manage.items.1'),
    t('cookies.manage.items.2'),
    t('cookies.manage.items.3'),
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-text mb-2">
          {t('cookies.title')}
        </h1>
        <p className="font-body text-sm text-gray-400 mb-8">{t('lastUpdated')}</p>
        <p className="font-body text-brand-text/80 mb-10 leading-relaxed">
          {t('cookies.intro')}
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('cookies.what.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('cookies.what.text')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('cookies.types.heading')}</h2>
          <div className="mb-4">
            <h3 className="font-heading text-lg text-brand-text mb-2">{t('cookies.types.technical.heading')}</h3>
            <p className="font-body text-brand-text/80 leading-relaxed">{t('cookies.types.technical.text')}</p>
          </div>
          <div>
            <h3 className="font-heading text-lg text-brand-text mb-2">{t('cookies.types.analytics.heading')}</h3>
            <p className="font-body text-brand-text/80 leading-relaxed">{t('cookies.types.analytics.text')}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('cookies.thirdParty.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('cookies.thirdParty.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {thirdPartyItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('cookies.manage.heading')}</h2>
          <p className="font-body text-brand-text/80 mb-3 leading-relaxed">{t('cookies.manage.text')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {manageItems.map((item, i) => (
              <li key={i} className="font-body text-brand-text/80">{item}</li>
            ))}
          </ul>
          <p className="font-body text-brand-text/80 mt-3 leading-relaxed italic">{t('cookies.manage.note')}</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-xl text-brand-text mb-3">{t('cookies.updates.heading')}</h2>
          <p className="font-body text-brand-text/80 leading-relaxed">{t('cookies.updates.text')}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
