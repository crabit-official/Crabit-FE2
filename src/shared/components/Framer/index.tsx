'use client';

import type { ReactNode } from 'react';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface IFramerProps extends MotionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  location?: 'top' | 'bottom';
}

/**
 * @param location top은 위에서 아래로, bottom은 아래에서 올라오는 애니메이션 입니다.
 * */

interface IFramerProps extends MotionProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  location?: 'top' | 'bottom';
  onClick?: () => void;
}

function Framer({ children, className, duration = 1, location = 'bottom', onClick, ...props }: IFramerProps) {
  return (
    <motion.div
      onClick={onClick}
      {...props}
      viewport={{ once: true }}
      className={className}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{
        y: location === 'bottom' ? 30 : -30,
        opacity: 0,
      }}
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
