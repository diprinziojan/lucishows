'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';

const DIGITS = '0123456789';

type ScrambleTextProps = {
  text: string;
  className?: string;
  speed?: number;
  revealDelay?: number;
};

export function ScrambleText({ text, className = '', speed = 50, revealDelay = 120 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);
  const hasMounted = useRef(false);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const scramble = useCallback(() => {
    if (hasAnimated.current || !hasMounted.current) return;
    hasAnimated.current = true;

    const total = text.length;
    let revealed = 0;

    // Start with all numbers
    setDisplay(
      text.replace(/[^ .]/g, () => DIGITS[Math.floor(Math.random() * DIGITS.length)])
    );

    const interval = setInterval(() => {
      setDisplay(() => {
        let result = '';
        for (let i = 0; i < total; i++) {
          if (text[i] === ' ' || text[i] === '.') {
            result += text[i];
          } else if (i < revealed) {
            result += text[i];
          } else {
            result += DIGITS[Math.floor(Math.random() * DIGITS.length)];
          }
        }
        return result;
      });
    }, speed);

    const revealInterval = setInterval(() => {
      revealed++;
      if (revealed > total) {
        clearInterval(interval);
        clearInterval(revealInterval);
        setDisplay(text);
      }
    }, revealDelay);

    return () => {
      clearInterval(interval);
      clearInterval(revealInterval);
    };
  }, [text, speed, revealDelay]);

  useEffect(() => {
    if (isInView && hasMounted.current) {
      return scramble();
    }
  }, [isInView, scramble]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
