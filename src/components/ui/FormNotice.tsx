'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function FormNotice({ namespace }: { namespace: 'contactForms' | 'proposal' }) {
  const t = useTranslations(namespace);
  return <p className="text-xs leading-relaxed text-brand-text-muted">
    {t('privacyNotice')}<Link href="/privacy" className="underline underline-offset-2 text-brand-text">{t('privacyLink')}</Link>.
  </p>;
}

export function Honeypot(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <div className="form-honeypot" aria-hidden="true">
    <label>Website<input {...props} type="text" tabIndex={-1} autoComplete="off" /></label>
  </div>;
}
