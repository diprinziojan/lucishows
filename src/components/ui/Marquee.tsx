'use client';

import { useState } from 'react';
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
  const [paused, setPaused] = useState(false);

  return (
    <div className={className}>
      <div className="flex justify-center mb-3">
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}
          className="marquee-control rounded-full border border-brand-card-border bg-white px-4 py-2 text-xs font-medium text-brand-text">
          {t(paused ? 'resume' : 'pause')}
        </button>
      </div>
      <div className="marquee-container" data-paused={paused} tabIndex={0} role="region" aria-label={t(label)}>
        <div className={`marquee-track flex w-max ${animation}`}>
          <div className={`marquee-group flex shrink-0 items-center ${gapClass}`}>{children}</div>
          <div aria-hidden="true" inert className={`marquee-group marquee-duplicate flex shrink-0 items-center ${gapClass}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
