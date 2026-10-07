'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const DIGITS = '0123456789';
type ScrambleTextProps = { text: string; className?: string; speed?: number; revealDelay?: number };

export function ScrambleText({ text, className = '', speed = 50, revealDelay = 60 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const started = performance.now();
    const interval = setInterval(() => {
      const revealed = Math.floor((performance.now() - started) / revealDelay);
      if (revealed >= text.length) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }
      setDisplay(text.split('').map((letter, i) => i < revealed || /[ .]/.test(letter)
        ? letter : DIGITS[Math.floor(Math.random() * DIGITS.length)]).join(''));
    }, speed);
    return () => clearInterval(interval);
  }, [isInView, reducedMotion, text, speed, revealDelay]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{reducedMotion ? text : display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
