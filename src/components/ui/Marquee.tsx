'use client';

import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
  label: 'brands' | 'portrait' | 'landscape';
  animation: 'animate-marquee' | 'animate-marquee-stats' | 'animate-marquee-reverse';
  gapClass?: string;
  className?: string;
};

export function Marquee({ children, label, animation, gapClass = 'gap-5 pr-5', className = '' }: Props) {
  const t = useTranslations('marquee');

  return (
    <div className={className}>
      <div className="marquee-container" role="region" aria-label={t(label)}>
        <div className={`marquee-track flex w-max ${animation}`}>
          <div className={`marquee-group flex shrink-0 items-center ${gapClass}`}>{children}</div>
          <div aria-hidden="true" inert className={`marquee-group marquee-duplicate flex shrink-0 items-center ${gapClass}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
