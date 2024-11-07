'use client';

import React from 'react';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

import ChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeCard';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

function AllChallengeContents() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Framer
        whileHover={{ scale: 1.01 }}
        className="flex min-h-80 w-64 cursor-pointer flex-col justify-center gap-20 overflow-hidden rounded-lg border border-solid border-gray-100 bg-main-gradient px-6 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
      >
        <Typography size="h2" className="break-keep text-white">
          새로운
          <br /> 챌린지 추가하기
        </Typography>
        <Flex rowColumn="center">
          <BsFillPatchPlusFill size={50} className="text-white opacity-80" />
        </Flex>
      </Framer>
      {new Array(4).fill('').map((_, idx) => (
        <ChallengeCard key={idx} onClick={() => router.push(`dashboard/${idx}`)} />
      ))}
    </div>
  );
}

export default AllChallengeContents;
