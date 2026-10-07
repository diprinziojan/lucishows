'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const brands: { name: string; src: string; className?: string }[] = [
  { name: 'Cupra', src: '/images/brands/cupra (1).svg' },
  { name: 'Rituals', src: '/images/brands/rituals.svg' },
  { name: 'Sephora', src: '/images/brands/sephora-logo.svg' },
  { name: 'SHEIN', src: '/images/brands/shein-1.svg' },
  { name: 'Temu', src: '/images/brands/temu-logo.svg' },
  { name: 'Egos', src: '/egos-logo.png', className: 'h-18 w-44 brightness-0 opacity-50' },
];

export function BrandCarousel() {
  const t = useTranslations('brands');
  const row = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative z-10 py-8 md:py-10" style={{ background: 'linear-gradient(180deg, #FCD5E0 0%, #FEE7ED 50%, #FFF5F8 100%)' }}>
      <p className="text-center text-brand-text-muted text-xs uppercase tracking-[0.25em] font-body font-medium mb-6">
        {t('heading')}
      </p>
      <div className="marquee-container">
        <div className="flex animate-marquee gap-20 items-center">
          {row.map((brand, i) => (
            <div
              key={i}
              className={`flex-shrink-0 relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${brand.className || 'h-10 w-28'}`}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
