'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'es' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="cursor-pointer bg-white/50 backdrop-blur-sm border border-gray-200 text-brand-text text-sm font-medium px-3 py-1.5 rounded-full hover:bg-brand-cta hover:text-white hover:border-brand-cta transition-all duration-200"
    >
      {t('switch_label')}
    </button>
  );
}
