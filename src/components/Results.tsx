'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { InstagramLogo, Eye, UsersThree, Rocket } from '@phosphor-icons/react';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { SectionWrapper } from './ui/SectionWrapper';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { AnimatedHeading } from './ui/AnimatedHeading';

const stats = [
  { target: 5, prefix: '+', suffix: 'M', key: 'followers', icon: InstagramLogo },
  { target: 100, prefix: '+', suffix: 'M', key: 'views', icon: Eye },
  { target: 64, prefix: '', suffix: '.5%', key: 'reach', icon: UsersThree },
  { target: 150, prefix: '', suffix: '+', key: 'campaigns', icon: Rocket },
];

const portraitShots = [
  '/vertical-stats/followers-stats.jpeg',
  '/vertical-stats/tiktok-stats.jpeg',
  '/vertical-stats/stats-tiktok-3.jpg',
  '/vertical-stats/stats-fb.jpeg',
  '/vertical-stats/stats-tiktok-2.jpg',
  '/vertical-stats/stats-tiktok-4.png',
  '/vertical-stats/stats-tiktok-5.webp',
];

const landscapeShots = [
  '/stats/seo-stats.png',
  '/stats/stats-facebook.jpg',
  '/stats/backlinks-stats.png',
  '/stats/thread-283151841-15877300006956618146.png',
];

/* Duplicate each set for seamless infinite loop */
const portraitRow = [...portraitShots, ...portraitShots];
const landscapeRow = [...landscapeShots, ...landscapeShots];

export function Results() {
  const t = useTranslations('results');

  return (
    <SectionWrapper id="results" bg="blush">
      <div className="text-center mb-14">
        <AnimatedHeading
          before={t('heading_before')}
          highlight={t('heading_highlight')}
          subtitle={t('subheading')}
          className="font-heading text-4xl md:text-5xl font-bold text-brand-text mb-4"
        />
      </div>

      {/* Stats row — gradient cards */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl p-5 md:p-6 text-center bg-gradient-to-br from-white via-[#FFF5F8] to-[#FEE7ED] shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Subtle pink glow */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-brand-cta/10 blur-2xl" />

              <div className="relative z-10 text-brand-text">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/70 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-brand-cta" weight="fill" />
                </div>
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <p className="font-body text-brand-text-muted text-xs mt-1">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Description text */}
      <motion.p
        variants={fadeUp}
        className="font-body text-brand-text-muted text-sm md:text-base text-center max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        {t('carousel_description')}
      </motion.p>

      {/* Row 1 — Portrait (vertical) screenshots → moves left */}
      <motion.div variants={fadeUp} className="marquee-container -mx-6 mb-5">
        <div className="flex animate-marquee-stats gap-5 items-center">
          {portraitRow.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[180px] sm:w-[220px] rounded-2xl overflow-hidden shadow-md bg-white border border-brand-card-border"
            >
              <Image
                src={src}
                alt={`Stats ${(i % portraitShots.length) + 1}`}
                width={400}
                height={868}
                className="w-full h-auto pointer-events-none select-none"
                sizes="220px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Row 2 — Landscape (horizontal) screenshots → moves right */}
      <motion.div variants={fadeUp} className="marquee-container -mx-6">
        <div className="flex animate-marquee-reverse gap-5 items-center">
          {landscapeRow.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] sm:w-[400px] rounded-2xl overflow-hidden shadow-md bg-white border border-brand-card-border"
            >
              <Image
                src={src}
                alt={`Stats ${(i % landscapeShots.length) + 1}`}
                width={800}
                height={500}
                className="w-full h-auto pointer-events-none select-none"
                sizes="400px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
