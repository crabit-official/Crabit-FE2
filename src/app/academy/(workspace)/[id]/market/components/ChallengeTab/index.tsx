'use client';

import { useParams, usePathname } from 'next/navigation';

import Flex from '@/shared/components/Flex';

function ChallengeTab() {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;
  return (
    <Flex className="gap-4">
      <div className={`${pathname === `/academy/${id}/market` ? 'bg-main-pink text-white' : ''} rounded-xl px-2 py-1 text-sm`}>학원 공개 챌린지</div>
    </Flex>
  );
}

export default ChallengeTab;
