import React from 'react';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import Image from 'next/image';

import ChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeCard';
import Menubar from '@/app/academy/(workspace)/[id]/dashboard/components/Menubar';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

function AcademyDashBoardPage() {
  return (
    <Flex rowColumn="center" className="gap-2">
      <Flex row="start" className="relative h-40 w-full max-w-[1100px] px-6 md:h-60 md:px-0">
        <Flex column="center" className="w-full gap-1">
          <Typography size="h5" className="text-main-deep-pink">
            매일의 작은 성취를 통한 습관 형성
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            크래빗 수학학원 챌린지
          </Typography>
        </Flex>
        <Image src="/images/logo_goal.webp" alt="img" width={400} height={400} className="absolute right-0 top-0 hidden opacity-40 lg:block" />
      </Flex>
      <div className="flex flex-col gap-20 lg:grid lg:grid-cols-[180px,1fr] lg:gap-10 xl:gap-32">
        <Menubar />
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
            <ChallengeCard key={idx} />
          ))}
        </div>
      </div>
    </Flex>
  );
}

export default AcademyDashBoardPage;
