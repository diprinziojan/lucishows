'use client';

import { motion } from 'framer-motion';

type GlossyButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'sm' | 'full' | 'gradient';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
};

export function GlossyButton({ children, href, onClick, variant = 'default', type = 'button', disabled, className = '', wrapperClassName = '' }: GlossyButtonProps) {
  const sizeClass =
    variant === 'sm' ? 'glossy-cta-sm' :
    variant === 'full' ? 'glossy-cta-full' :
    variant === 'gradient' ? 'glossy-cta-gradient' :
    '';

  const isFull = variant === 'full';

  const inner = (
    <span className={`glossy-cta-wrapper ${isFull ? 'w-full block' : ''} ${wrapperClassName}`}>
      <span className={`glossy-cta ${sizeClass} ${className}`}>
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={isFull ? 'block w-full' : undefined}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${isFull ? 'block w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {inner}
    </motion.button>
  );
}
