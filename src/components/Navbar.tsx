'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { List, X } from '@phosphor-icons/react';
import { GlossyButton } from './ui/GlossyButton';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const sectionLinks = [
  { key: 'about', hash: '#intro' },
  { key: 'packs', hash: '#pricing' },
  { key: 'results', hash: '#results' },
  { key: 'contact', hash: '#contact' },
  { key: 'faq', hash: '#faq' },
];

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const getHref = (hash: string) => `/${locale}${hash}`;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 overflow-visible ${
          scrolled ? 'bg-white/85 backdrop-blur-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-2 sm:pb-3 flex items-center justify-between overflow-visible">
          {/* Left: Burger (mobile) + Logo */}
          <div className="flex items-center gap-3 overflow-visible">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/50 border border-gray-200 text-brand-text hover:bg-white/70 transition-colors"
              aria-label="Open menu"
            >
              <List size={22} weight="bold" />
            </button>
            <a href={`/${locale}`} className="relative h-14 md:h-20 flex items-center">
              <Image
                src="/logo-luciana.svg"
                alt={t('brand')}
                width={480}
                height={160}
                className="h-14 md:h-20 w-auto"
                priority
              />
            </a>
          </div>

          {/* Nav links — desktop */}
          <ul className="hidden md:flex items-center gap-6">
            {sectionLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={getHref(link.hash)}
                  className="font-heading text-sm font-semibold text-brand-text hover:text-brand-cta transition-colors tracking-wide"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <GlossyButton href={getHref('#contact')} variant="sm">
              <span className="whitespace-nowrap">{t('cta')}</span>
            </GlossyButton>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-white shadow-xl flex flex-col overflow-hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-card-border">
                <Image
                  src="/logo-luciana.svg"
                  alt={t('brand')}
                  width={400}
                  height={136}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-brand-text hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-5 py-6">
                <ul className="space-y-1">
                  {sectionLinks.map((link, i) => (
                    <motion.li
                      key={link.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <a
                        href={getHref(link.hash)}
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 px-4 rounded-xl font-body text-base font-medium text-brand-text hover:bg-brand-cta/10 hover:text-brand-cta transition-colors"
                      >
                        {t(link.key)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-5 border-t border-brand-card-border">
                <GlossyButton href={getHref('#contact')} variant="full" onClick={() => setMenuOpen(false)}>
                  <span className="whitespace-nowrap">{t('cta')}</span> <span className="cta-arrow">›</span>
                </GlossyButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
