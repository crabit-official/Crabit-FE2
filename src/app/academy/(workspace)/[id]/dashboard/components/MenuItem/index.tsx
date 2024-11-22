'use client';

import React, { useState } from 'react';
import { GoX } from 'react-icons/go';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import type { ITabMenu } from '@/shared/constants/tab-menu';

interface IMenuItemProps {
  academyId: number;
  activeTab: string;
  content: ITabMenu[];
  title: string;
  type?: 'public-challenge' | 'dashboard';
}

function MenuItem({ title, content, type = 'dashboard', academyId, activeTab }: IMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const selectedTab = activeTab || 'all';

  return (
    <motion.ul className="border-b border-solid border-gray-300" layout onClick={toggleOpen}>
      <motion.div layout className="flex cursor-pointer items-center justify-between py-4 text-lg font-bold">
        <p>{title}</p>
        <GoX className={`${isOpen ? 'rotate-180' : 'rotate-45'} transition-transform duration-500`} />
      </motion.div>
      <ul>
        <AnimatePresence>
          {isOpen && (
            <motion.div className="flex flex-col pb-3" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {content.map((tab) => (
                <Link
                  href={`/academy/${academyId}/${type}?tab=${tab.tab}`}
                  key={tab.tab}
                  onClick={(e) => e.stopPropagation()}
                  className={`${selectedTab === tab.tab ? 'text-main-deep-pink' : 'text-gray-700'} cursor-pointer pb-3 pl-5 hover:text-main-deep-pink`}
                >
                  {tab.text}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </motion.ul>
  );
}

export default MenuItem;
