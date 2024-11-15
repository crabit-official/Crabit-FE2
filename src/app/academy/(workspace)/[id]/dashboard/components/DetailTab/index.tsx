'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

import type { ITabMenu } from '@/shared/constants/tab-menu';

interface IDetailTabProps {
  academyId: number;
  menu: ITabMenu[];
  releasedChallengeId?: number;
  type: 'market' | 'dashboard';
}

function DetailTab({ academyId, releasedChallengeId, menu, type }: IDetailTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab') || menu[0].tab;

  const handleTabChange = (tabName: string) => {
    if (type === 'dashboard') {
      router.push(`/academy/${academyId}/dashboard/${releasedChallengeId}?tab=${tabName}`);
    } else if (type === 'market') {
      router.push(`/academy/${academyId}/market/?tab=${tabName}`);
    }
  };
  return (
    <motion.div className="flex w-full justify-center">
      <ul className="flex gap-3">
        {menu.map((item, idx) => (
          <li key={idx} onClick={() => handleTabChange(item.tab)} className="relative cursor-pointer py-1">
            <p className={`${tab === item.tab ? 'font-bold text-main-deep-pink' : 'font-medium text-gray-600'}`}>{item.text}</p>
            {tab === item.tab && <motion.div layoutId="underline" className="absolute inset-x-0 bottom-0 h-[2px] bg-main-deep-pink" />}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default DetailTab;
