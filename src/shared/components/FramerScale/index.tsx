import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

function FramerScale({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="size-full"
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
