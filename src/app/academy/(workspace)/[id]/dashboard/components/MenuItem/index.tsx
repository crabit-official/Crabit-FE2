'use client';

import React, { useState } from 'react';
import { GoX } from 'react-icons/go';
import { AnimatePresence, motion } from 'framer-motion';

function MenuItem({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <motion.ul className="border-b border-solid border-gray-300" layout onClick={toggleOpen}>
      <motion.div layout className="flex cursor-pointer items-center justify-between py-4 text-lg font-bold">
        <p>{text}</p>
        <GoX />
      </motion.div>
      <ul>
        <AnimatePresence>
          {isOpen && (
            <motion.div className="pb-3" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="cursor-pointer pb-3 pl-5 text-gray-700">우리 학원 공개</p>
              <p className="cursor-pointer pb-3 pl-5 text-gray-700">크래빗 공개</p>
              <p className="cursor-pointer pb-3 pl-5 text-gray-700">비공개 챌린지</p>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </motion.ul>
  );
}

export default MenuItem;
