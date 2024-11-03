import React from 'react';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

interface IChallengeCardProps {
  id: number;
}

export default function ChallengeCard({ id }: IChallengeCardProps) {
  return (
    <Framer
      whileHover={{ scale: 1.01 }}
      duration={id * 0.5}
      className="relative flex w-64 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg border border-solid border-gray-100 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
    >
      <div className="absolute left-2 top-2 rounded-2xl bg-neutral-500/80 px-2 py-1 text-xs text-white">공부 챌린지</div>
      <Image src="/images/logo_goal.webp" alt="test" width={480} height={100} className="h-40 w-full object-cover" />
      <Flex column="start" className="size-full min-h-32 gap-2 px-6 pb-10 pt-6">
        <Typography size="h5" className="break-keep">
          감사일기 챌린지 ✏️
        </Typography>
        <Typography size="h5" as="p" className="text-overflow-3 break-keep text-xs opacity-60">
          진행 방법: 매일 하루를 되돌아보고, 감사했던 일을 적어보는 감사일기 챌린지에요. 이번주는 우리 가족과 나의 친구에 대해 감사한 것을 적어봅시다!
        </Typography>
      </Flex>
    </Framer>
  );
}
