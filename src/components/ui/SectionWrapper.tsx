'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: 'blush' | 'light' | 'dark';
};

export function SectionWrapper({ children, className = '', id, bg = 'blush' }: SectionWrapperProps) {
  const reducedMotion = useReducedMotion();
  const bgClass = bg === 'light' ? 'section-light' : bg === 'dark' ? 'bg-[#1A1A1A]' : 'section-blush';

  return (
    <section id={id} className={`relative z-10 py-20 md:py-28 ${bgClass} ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial={reducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
