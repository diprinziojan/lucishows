'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { wordPull, wordContainer, subtitleReveal } from '@/lib/animations';

type AnimatedHeadingProps = {
  before: string;
  highlight: string;
  subtitle?: string;
  className?: string;
  subtitleClassName?: string;
  lineBreak?: boolean;
};

export function AnimatedHeading({
  before,
  highlight,
  subtitle,
  className = 'font-heading text-4xl md:text-5xl font-bold text-brand-text',
  subtitleClassName = 'font-body text-brand-text-muted text-base md:text-lg max-w-2xl mx-auto',
  lineBreak = true,
}: AnimatedHeadingProps) {
  const reducedMotion = useReducedMotion();
  const beforeWords = before.split(' ').filter(Boolean);
  const highlightWords = highlight.split(' ').filter(Boolean);

  return (
    <>
      <motion.h2
        className={className}
        style={{ perspective: 400 }}
        variants={wordContainer}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {beforeWords.map((word, i) => (
          <motion.span
            key={i}
            variants={wordPull}
            className="inline-block"
          >
            {word}{'\u00a0'}
          </motion.span>
        ))}
        {lineBreak && <br />}
        {highlightWords.map((word, i) => (
          <motion.span
            key={`hl-${i}`}
            variants={wordPull}
            className="inline-block"
            style={{ backgroundImage: 'linear-gradient(transparent 60%, rgba(251,150,188,0.35) 60%)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}
          >
            {word}{'\u00a0'}
          </motion.span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={subtitleReveal}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className={`mt-4 ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );
}
