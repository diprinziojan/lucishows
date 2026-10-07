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

export function DeliveryFallback({ namespace, href }: { namespace: 'contactForms' | 'proposal'; href: string }) {
  const t = useTranslations(namespace);
  return <div role="alert" className="rounded-xl border border-brand-card-border bg-brand-bg-light p-4 text-center">
    <p className="text-sm leading-relaxed text-brand-text-muted">{t('deliveryFailed')}</p>
    <a href={href} className="mt-3 inline-block rounded-lg bg-brand-text px-5 py-3 text-sm font-medium text-white hover:bg-black">
      {t('emailAction')}
    </a>
  </div>;
}
