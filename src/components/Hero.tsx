'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { InstagramLogo, TiktokLogo, FacebookLogo } from '@phosphor-icons/react';
import { GlossyButton } from './ui/GlossyButton';
import { ScrambleText } from './ui/ScrambleText';
import { fadeUp, slideFromRight, scaleIn, staggerContainer } from '@/lib/animations';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative z-10 overflow-hidden hero-gradient">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-blob hero-blob--1" />
        <div className="hero-blob hero-blob--2" />
        <div className="hero-blob hero-blob--3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Text Column */}
          <motion.div
            className="lg:w-[55%] text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-gray-200 text-sm font-body font-medium px-4 py-1.5 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cta opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cta" />
                </span>
                {t('badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1]"
            >
              {t('heading_1')}{' '}
              <span className="text-highlight">{t('heading_highlight')}</span>{' '}
              {t('heading_2')}{' '}
              <ScrambleText
                text={t('heading_scramble')}
                className="text-brand-ink"
                speed={50}
                revealDelay={120}
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-brand-text-muted mt-4 max-w-lg mx-auto lg:mx-0"
            >
              {t('subheading')}
            </motion.p>

            <motion.div variants={scaleIn} className="mt-8">
              <GlossyButton href="#contact">
                <span className="whitespace-nowrap">{t('cta')}</span> <span className="cta-arrow">›</span>
              </GlossyButton>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            className="w-full lg:w-[45%] relative"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute -z-10 inset-0 w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-cta/20 to-transparent blur-3xl animate-float" />
            </div>

            <div className="relative max-w-[280px] mx-auto lg:max-w-[340px]">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                <Image
                  src="/images/hero.jpg"
                  alt={t('imageAlt')}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 280px, 340px"
                />
              </div>

              {/* Glassmorphism social bar */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/75 backdrop-blur-xl rounded-full shadow-lg px-3 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2.5 sm:gap-4 border border-white/60">
                <a aria-label="Instagram — Luciana López" href="https://instagram.com/luci.showss" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <InstagramLogo size={18} weight="fill" className="text-brand-ink" />
                  <span className="font-body text-xs font-bold text-brand-text">1.3M</span>
                </a>
                <div className="w-px h-4 bg-brand-cta/20" />
                <a aria-label="TikTok — Luciana López" href="https://tiktok.com/@luci.shows" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <TiktokLogo size={18} weight="fill" className="text-brand-ink" />
                  <span className="font-body text-xs font-bold text-brand-text">2M</span>
                </a>
                <div className="w-px h-4 bg-brand-cta/20" />
                <a aria-label="Facebook — Luciana López" href="https://www.facebook.com/p/Lucishows-61555122039982/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <FacebookLogo size={18} weight="fill" className="text-brand-ink" />
                  <span className="font-body text-xs font-bold text-brand-text">1.3M</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
