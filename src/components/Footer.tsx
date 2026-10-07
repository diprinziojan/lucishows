'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { InstagramLogo, TiktokLogo, FacebookLogo, EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { Link } from '@/i18n/navigation';
import { GlossyButton } from './ui/GlossyButton';

export function Footer({ hideCta = false }: { hideCta?: boolean } = {}) {
  const t = useTranslations('footer');
  const locale = useLocale();
  const getHref = (hash: string) => `/${locale}${hash}`;

  return (
    <footer className="relative z-10">
      {/* CTA Banner */}
      {!hideCta && (
      <div className="bg-gradient-to-r from-brand-bg via-brand-cta to-brand-bg-dark">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <motion.h2
            className="font-heading text-3xl md:text-4xl text-brand-text mb-3 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('ctaHeading')}
          </motion.h2>
          <motion.p
            className="font-body text-brand-text-muted text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('ctaSub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlossyButton href="mailto:lucianalopezfb@gmail.com">
              {t('links.contact')}
            </GlossyButton>
          </motion.div>
        </div>
      </div>
      )}

      {/* Main footer */}
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#1F1318]">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand */}
            <motion.div variants={fadeUp}>
              <Image
                src="/logo-luciana.svg"
                alt="Luciana"
                width={180}
                height={52}
                className="mb-4"
              />
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                {t('description')}
              </p>
            </motion.div>

            {/* Col 2: Sections */}
            <motion.div variants={fadeUp}>
              <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4">
                {t('sections')}
              </h4>
              <ul className="space-y-2">
                <li><a href={getHref('#intro')} className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.about')}</a></li>
                <li><a href={getHref('#pricing')} className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.packs')}</a></li>
                <li><a href={getHref('#results')} className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.results')}</a></li>
                <li><a href={getHref('#faq')} className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.faq')}</a></li>
                <li><a href={getHref('#contact')} className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.contact')}</a></li>
              </ul>
            </motion.div>

            {/* Col 3: Legal */}
            <motion.div variants={fadeUp}>
              <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4">
                {t('legal')}
              </h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.privacy')}</Link></li>
                <li><Link href="/terms" className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.terms')}</Link></li>
                <li><Link href="/cookies" className="font-body text-gray-400 text-sm hover:text-brand-cta hover:translate-x-0.5 transition-all duration-200 inline-block">{t('links.cookies')}</Link></li>
              </ul>
            </motion.div>

            {/* Col 4: Contact */}
            <motion.div variants={fadeUp}>
              <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4">
                {t('contactTitle')}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <EnvelopeSimple className="w-4 h-4 text-brand-cta flex-shrink-0" weight="fill" />
                  <a href="mailto:lucianalopezfb@gmail.com" className="font-body text-gray-400 text-sm hover:text-brand-cta transition-colors">lucianalopezfb@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-cta flex-shrink-0" weight="fill" />
                  <a href="tel:+34601166257" className="font-body text-gray-400 text-sm hover:text-brand-cta transition-colors">+34 601 16 62 57</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-cta flex-shrink-0 mt-0.5" weight="fill" />
                  <span className="font-body text-gray-400 text-sm">{t('location')}</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Gradient separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-cta/30 to-transparent mb-6" />

          {/* Bottom bar */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-400 font-body">
                {t('copyright')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                aria-label="Instagram — Luciana López"
                href="https://www.instagram.com/luci.showss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-brand-cta hover:border-brand-cta/50 hover:shadow-[0_0_12px_rgba(251,150,188,0.3)] transition-all duration-300"
              >
                <InstagramLogo className="w-5 h-5" weight="fill" />
              </a>
              <a
                aria-label="TikTok — Luciana López"
                href="https://www.tiktok.com/@luci.shows"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-brand-cta hover:border-brand-cta/50 hover:shadow-[0_0_12px_rgba(251,150,188,0.3)] transition-all duration-300"
              >
                <TiktokLogo className="w-5 h-5" weight="fill" />
              </a>
              <a
                aria-label="Facebook — Luciana López"
                href="https://www.facebook.com/p/Lucishows-61555122039982/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-brand-cta hover:border-brand-cta/50 hover:shadow-[0_0_12px_rgba(251,150,188,0.3)] transition-all duration-300"
              >
                <FacebookLogo className="w-5 h-5" weight="fill" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
