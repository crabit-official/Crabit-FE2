'use client';

import type { ReactNode } from 'react';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface IFramerProps extends MotionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

function Framer({ children, className, duration = 1, ...props }: IFramerProps) {
  return (
    <motion.div
      {...props}
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
