'use client';

import React, { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { AnimatePresence, motion } from 'framer-motion';

import Typography from '@/shared/components/Typography';

interface IToggleProps {
  content: React.ReactNode;
  title: string;
}

function Toggle({ title, content }: IToggleProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <motion.ul className="w-full border-b border-solid border-gray-300" layout onClick={toggleOpen}>
      <motion.div layout className="flex w-full cursor-pointer items-center justify-between gap-10 py-4 text-lg font-bold">
        <Typography size="h3">{title}</Typography>
        <GoTriangleDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-500`} />
      </motion.div>
      <ul>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-full pb-3"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </motion.ul>
  );
}

export default Toggle;
