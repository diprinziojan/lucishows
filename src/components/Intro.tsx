'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkle, ChartLineUp, Users } from '@phosphor-icons/react';
import { SectionWrapper } from './ui/SectionWrapper';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { fadeUp, staggerContainer } from '@/lib/animations';

const icons = [Sparkle, ChartLineUp, Users] as const;

export function Intro() {
  const t = useTranslations('intro');

  return (
    <SectionWrapper id="intro" bg="blush">
      {/* Top: Text left + Photo right */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14 mb-12 md:mb-16">
        <motion.div variants={fadeUp} className="lg:w-1/2 text-center lg:text-left">
          <AnimatedHeading
            before={t('heading_before')}
            highlight={t('heading_highlight')}
            lineBreak={false}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text mb-4"
          />
          <div className="font-body text-brand-text-muted text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 space-y-4">
            {(['p1', 'p2', 'p3'] as const).map((key) => (
              <p key={key}>
                {t.rich(key, {
                  highlight: (chunks) => (
                    <span className="text-brand-cta font-semibold">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:w-1/2 flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-xl max-w-[280px] sm:max-w-[320px] lg:max-w-[400px]">
            <Image
              src="/images/about-phone.jpg"
              alt={t('imageAlt')}
              width={400}
              height={500}
              className="w-full h-auto"
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom: 3 pillars */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {Array.from({ length: 3 }, (_, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl p-6 text-center bg-gradient-to-br from-white via-[#FFF5F8] to-[#FEE7ED] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-brand-cta/10 blur-2xl" />
              <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand-cta" weight="fill" />
              </div>
              <h3 className="font-heading text-lg font-bold text-brand-text mb-2">
                {t(`pillars.${i}.title`)}
              </h3>
              <p className="font-body text-brand-text-muted text-sm leading-relaxed">
                {t(`pillars.${i}.text`)}
              </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
