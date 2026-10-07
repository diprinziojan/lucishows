'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle } from '@phosphor-icons/react';
import { GlossyButton } from './ui/GlossyButton';
import { SectionWrapper } from './ui/SectionWrapper';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { fadeUp, staggerContainer } from '@/lib/animations';

const plans = [
  { key: 'presencia', featureCount: 7, popular: false },
  { key: 'crecimiento', featureCount: 5, popular: true },
  { key: 'dominio', featureCount: 9, popular: false },
] as const;

export function Pricing() {
  const t = useTranslations('pricing');

  return (
    <SectionWrapper id="pricing" bg="light">
      <div className="text-center mb-16">
        <AnimatedHeading
          before={t('heading_before')}
          highlight={t('heading_highlight')}
          subtitle={t('subheading')}
          className="font-heading text-4xl md:text-5xl font-bold text-brand-text mb-4"
          subtitleClassName="font-body text-brand-text-muted text-lg"
        />
      </div>

      {/* 3 main packs */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.key}
            variants={fadeUp}
            className={`rounded-3xl p-8 md:p-10 shadow-md hover:shadow-lg transition-shadow duration-300 relative flex flex-col ${
              plan.popular
                ? 'popular-card bg-gradient-to-br from-white via-[#FFF5F8] to-[#FEE7ED] md:scale-[1.05] shadow-lg shadow-brand-cta/15 border-0'
                : 'bg-white border border-brand-card-border'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-cta text-brand-text text-xs font-bold px-5 py-1.5 rounded-full tracking-wider shadow-md shadow-brand-cta/25 animate-pulse-glow">
                {t('popular_badge')}
              </div>
            )}

            <h3 className="font-heading text-2xl font-bold text-brand-text">
              {t(`plans.${plan.key}.name`)}
            </h3>

            <p className="mt-2 font-body text-brand-text-muted text-sm">
              {t(`plans.${plan.key}.description`)}
            </p>

            <div className="h-px bg-gray-100 my-6" />

            <ul className="space-y-3 mb-8 flex-1">
              {Array.from({ length: plan.featureCount }, (_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-cta flex-shrink-0 mt-0.5" weight="fill" />
                  <span className="font-body text-brand-text text-sm">
                    {t(`plans.${plan.key}.features.${i}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <GlossyButton href="#contact" wrapperClassName="glossy-cta-card-wrapper" className={`glossy-cta-card ${plan.popular ? 'glossy-cta-gradient' : ''}`}>
                {t('cta')}
              </GlossyButton>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </SectionWrapper>
  );
}
