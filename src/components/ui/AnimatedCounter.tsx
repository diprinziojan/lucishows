'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';

type AnimatedCounterProps = {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({ target, prefix = '', suffix = '', duration = 1200 }: AnimatedCounterProps) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const locale = useLocale();
  const digits = Number.isInteger(target) ? 0 : 1;
  const format = (value: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const startTime = performance.now();
    let frame: number;
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = (1 - Math.pow(1 - progress, 3)) * target;
      setCount(progress === 1 ? target : Math.floor(value * 10 ** digits) / 10 ** digits);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reducedMotion, target, duration, digits]);

  return (
    <span ref={ref} className="font-heading text-2xl md:text-3xl font-bold leading-none">
      <span aria-hidden="true">{prefix}{format(reducedMotion ? target : count)}{suffix}</span>
      <span className="sr-only">{prefix}{format(target)}{suffix}</span>
    </span>
  );
}
