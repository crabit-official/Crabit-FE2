'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

const menu = [
  { tab: 'challenge', text: '챌린지' },
  { tab: 'student', text: '학생' },
  { tab: 'statistics', text: '통계' },
];

interface IDetailTabProps {
  academyId: number;
  releasedChallengeId: number;
}

function DetailTab({ academyId, releasedChallengeId }: IDetailTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab') || 'challenge';

  const handleTabChange = (tabId: string) => {
    router.push(`/academy/${academyId}/dashboard/${releasedChallengeId}?tab=${tabId}`);
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
