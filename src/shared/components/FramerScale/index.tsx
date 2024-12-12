import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import cn from '@/shared/utils/style';

function FramerScale({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      viewport={{ once: true }}
      className={cn(className, 'size-full')}
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{
        ease: 'easeOut',
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
export default FramerScale;
