'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  amount?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  const initial = directions[direction];
  const animate = { x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ ...initial, opacity: 0 }}
      animate={isInView ? { ...animate, opacity: 1 } : { ...initial, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
