import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function pageMetadata(locale: string, path = '', titleKey?: 'privacy' | 'terms' | 'cookies' | 'proposal'): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const title = titleKey === 'proposal' ? (locale === 'es' ? 'Solicitar propuesta | Luciana López' : 'Request a Proposal | Luciana López')
    : titleKey ? `${(await getTranslations({ locale, namespace: 'legal' }))(`${titleKey}.title`)} | Luciana López` : t('title');
  const canonical = `https://lucianalopez.es/${locale}${path}`;
  return {
    title,
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        es: `https://lucianalopez.es/es${path}`,
        en: `https://lucianalopez.es/en${path}`,
      },
    },
    openGraph: { title, description: t('description'), url: canonical, locale: locale === 'es' ? 'es_ES' : 'en_GB' },
    twitter: { title, description: t('description') },
  };
}
