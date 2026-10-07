'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plus, Minus } from '@phosphor-icons/react';
import { SectionWrapper } from './ui/SectionWrapper';
import { GlossyButton } from './ui/GlossyButton';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { fadeUp } from '@/lib/animations';

const FAQ_COUNT = 12;

export function FAQ() {
  const t = useTranslations('faq');
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  const renderItem = (item: { question: string; answer: string }, index: number) => {
    const isOpen = openIndex === index;
    return (
      <div
        key={index}
        className={`rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'bg-gradient-to-br from-white via-[#FFF5F8] to-[#FEE7ED] shadow-md'
            : 'bg-white/60 border border-brand-card-border hover:bg-white hover:shadow-sm'
        }`}
      >
        <button
          type="button"
          id={`faq-question-${index}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="w-full px-5 py-4 flex justify-between items-center gap-4 cursor-pointer"
        >
          <span className={`font-body font-semibold text-left text-sm md:text-base transition-colors ${
            isOpen ? 'text-brand-text' : 'text-brand-text-muted'
          }`}>
            {item.question}
          </span>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen ? 'bg-brand-cta text-white' : 'bg-brand-bg-light text-brand-cta'
          }`}>
            {isOpen ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
          </div>
        </button>

        <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={!isOpen}>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
            >
              <p className="px-5 pb-5 text-brand-text-muted font-body text-sm leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <SectionWrapper id="faq" bg="blush">
      <div className="text-center mb-12">
        <AnimatedHeading
          before={t('heading_before')}
          highlight={t('heading_highlight')}
          className="font-heading text-4xl md:text-5xl font-bold text-brand-text mb-3"
        />
      </div>

      <motion.div
        variants={fadeUp}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="space-y-4">
          {left.map((item, i) => renderItem(item, i))}
        </div>
        <div className="space-y-4">
          {right.map((item, i) => renderItem(item, i + mid))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="text-center mt-10">
        <GlossyButton href="#contact" className="!whitespace-normal !text-center !leading-snug">
          {t('cta')} <span className="cta-arrow">›</span>
        </GlossyButton>
      </motion.div>
    </SectionWrapper>
  );
}
