'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeCard';

function ChallengeCardList() {
  const router = useRouter();
  return (
    <div className="grid min-h-[800px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {new Array(10).fill('').map((_, idx) => (
        <ChallengeCard key={idx} onClick={() => router.push(`market/${idx}`)} />
      ))}
    </div>
  );
}

export default ChallengeCardList;
