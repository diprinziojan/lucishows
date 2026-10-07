'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle, Circle, EnvelopeSimple } from '@phosphor-icons/react';
import { GlossyButton } from './ui/GlossyButton';
import { SectionWrapper } from './ui/SectionWrapper';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { fadeUp, staggerContainer } from '@/lib/animations';

const plans = [
  { key: 'presencia', featureCount: 7, popular: false },
  { key: 'crecimiento', featureCount: 5, popular: true },
  { key: 'dominio', featureCount: 9, popular: false },
] as const;

const CUSTOM_SERVICE_COUNT = 12;

export function Pricing() {
  const t = useTranslations('pricing');
  const [selected, setSelected] = useState<boolean[]>(Array(CUSTOM_SERVICE_COUNT).fill(false));

  const toggleService = (i: number) => {
    setSelected((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

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
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-cta text-white text-xs font-bold px-5 py-1.5 rounded-full tracking-wider shadow-md shadow-brand-cta/25 animate-pulse-glow">
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

      {/* Custom pack */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FEE7ED] rounded-3xl p-8 md:p-10 shadow-md border border-brand-card-border max-w-4xl mx-auto"
      >
        <div className="text-center mb-6">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-text">
            {t('custom.name')}
          </h3>
          <p className="mt-2 font-body text-brand-text-muted text-sm max-w-lg mx-auto">
            {t('custom.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {Array.from({ length: CUSTOM_SERVICE_COUNT }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleService(i)}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-left text-sm font-body font-medium border transition-all duration-200 cursor-pointer ${
                selected[i]
                  ? 'bg-brand-cta text-white border-brand-cta shadow-sm shadow-brand-cta/15'
                  : 'bg-white/80 text-brand-text-muted border-brand-card-border hover:border-brand-cta/40'
              }`}
            >
              {selected[i] ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" weight="fill" />
              ) : (
                <Circle className="w-5 h-5 flex-shrink-0 opacity-40" />
              )}
              {t(`custom.services.${i}`)}
            </button>
          ))}
        </div>

        <p className="text-center font-body text-brand-text-muted text-xs mb-8">
          {t('custom_subtitle')}
        </p>

        <div className="text-center flex flex-col items-center gap-3">
          <GlossyButton
            href={`mailto:management@lucishows.com?subject=${encodeURIComponent(t('custom_email_subject'))}&body=${encodeURIComponent(
              selected.some(Boolean)
                ? `Servicios seleccionados:\n${selected.map((s, i) => s ? `• ${t(`custom.services.${i}`)}` : '').filter(Boolean).join('\n')}\n\n`
                : ''
            )}`}
            wrapperClassName="glossy-cta-card-wrapper"
            className="glossy-cta-card glossy-cta-gradient"
          >
            <EnvelopeSimple size={16} weight="fill" className="mr-1" />
            {t('custom_cta')}
          </GlossyButton>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
