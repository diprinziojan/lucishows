'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type AnimatedCounterProps = {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-heading text-2xl md:text-3xl font-bold leading-none">
      {prefix}{count}{suffix}
    </span>
  );
}
