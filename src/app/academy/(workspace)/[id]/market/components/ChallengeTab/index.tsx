'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

const menu = [
  { tab: 'crabit', text: '크래빗 공식' },
  { tab: 'academy', text: '학원 챌린지' },
];

interface IChallengeTabProps {
  academyId: number;
}

function ChallengeTab({ academyId }: IChallengeTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab') || 'crabit';

  const handleTabChange = (tabName: string) => {
    router.push(`/academy/${academyId}/market/?tab=${tabName}`);
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

export default ChallengeTab;
