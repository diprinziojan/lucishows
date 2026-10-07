'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle } from '@phosphor-icons/react';
import { GlossyButton } from './ui/GlossyButton';
import { fadeUp, tabImageSwap, staggerContainer } from '@/lib/animations';
import { AnimatedCounter } from './ui/AnimatedCounter';

const tabConfig = {
  agency: { bulletCount: 7, image: '/images/desk-laptop.jpg' },
  influencer: { bulletCount: 6, image: '/images/hero-luci.jpg' },
} as const;

const tabs = ['agency', 'influencer'] as const;

export function ServiceTabs() {
  const t = useTranslations('services');
  const [activeTab, setActiveTab] = useState<'agency' | 'influencer'>('agency');

  const config = tabConfig[activeTab];

  return (
    <section id="services" className="relative z-10 py-14 md:py-28" style={{ background: 'linear-gradient(180deg, #FFF5F8 0%, #FFF5F8 50%, #FFFFFF 100%)' }}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text mb-3 md:mb-4">
            {t('heading')}
          </h2>
          <p className="font-body text-brand-text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div variants={fadeUp} className="flex justify-center gap-3 mb-8 md:mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-body font-semibold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-brand-cta text-brand-text shadow-md shadow-brand-cta/20'
                  : 'bg-white border border-gray-200 text-brand-text-muted hover:border-brand-cta/40'
              }`}
            >
              {t(`tabs.${tab}.label`)}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerContainer}
            className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10 items-center"
          >
            {/* Image — on mobile goes first, smaller */}
            <motion.div
              variants={tabImageSwap}
              className="rounded-2xl overflow-hidden shadow-lg max-w-[240px] sm:max-w-[280px] lg:max-w-[400px] mx-auto order-1 lg:order-2"
            >
              <Image
                src={config.image}
                alt={t(`tabs.${activeTab}.heading`)}
                width={400}
                height={500}
                className="w-full h-auto"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 400px"
              />
            </motion.div>

            {/* Text column */}
            <motion.div variants={fadeUp} className="order-2 lg:order-1 text-center lg:text-left">
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-brand-text mb-2 sm:mb-3">
                {t(`tabs.${activeTab}.heading`)}
              </h3>
              {activeTab === 'influencer' ? (
                <p className="font-body text-brand-text-muted text-sm sm:text-base mb-5 sm:mb-6">
                  {t('tabs.influencer.description_before')}{' '}
                  <AnimatedCounter target={5000000} prefix="+" />{' '}
                  {t('tabs.influencer.description_after')}
                </p>
              ) : (
                <p className="font-body text-brand-text-muted text-sm sm:text-base mb-5 sm:mb-6">
                  {t(`tabs.${activeTab}.description`)}
                </p>
              )}

              <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-left">
                {Array.from({ length: config.bulletCount }, (_, i) => (
                  <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cta flex-shrink-0 mt-0.5" weight="fill" />
                    <span className="font-body text-brand-text text-xs sm:text-sm">
                      {t(`tabs.${activeTab}.bullets.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center lg:justify-start">
                <GlossyButton href="#contact">
                  {t(`tabs.${activeTab}.cta`)} <span className="cta-arrow">›</span>
                </GlossyButton>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
