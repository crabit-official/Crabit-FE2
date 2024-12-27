'use client';

import React, { useState } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/shared/components/Button';
import Typography from '@/shared/components/Typography';

interface IToggleProps {
  buttonCloseLabel?: string;
  buttonOpenLabel?: string;
  content: React.ReactNode;
  setOpen?: boolean;
  title: string;
}

function Toggle({ title, content, setOpen = true, buttonCloseLabel, buttonOpenLabel }: IToggleProps) {
  const [isOpen, setIsOpen] = useState(setOpen);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <motion.ul className="w-full border-b border-solid border-gray-300" layout onClick={toggleOpen}>
      <motion.div layout className="flex w-full cursor-pointer items-center justify-between gap-10 pb-4 text-lg font-bold">
        <Typography size="h3" className="text-h5 sm:text-h3">
          {title}
        </Typography>
        {buttonOpenLabel && buttonCloseLabel ? (
          <Button type="button" variant={`${isOpen ? 'secondary' : 'main'}`} className="w-fit whitespace-nowrap px-2 py-1 text-sm" onClick={toggleOpen}>
            {isOpen ? buttonCloseLabel : buttonOpenLabel}
          </Button>
        ) : (
          <GoTriangleDown size={20} className={`${isOpen ? 'rotate-180' : 'rotate-0'} shrink-0 transition-transform duration-500`} />
        )}
      </motion.div>
      <li>
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
      </li>
    </motion.ul>
  );
}

export default Toggle;
