'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IFramerProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

function Framer({ children, className, duration = 1 }: IFramerProps) {
  return (
    <motion.div
      viewport={{ once: true }}
      className={className}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ y: 30, opacity: 0 }}
      transition={{
        ease: 'easeOut',
        duration,
      }}
    >
      {children}
    </motion.div>
  );
}

export default Framer;
