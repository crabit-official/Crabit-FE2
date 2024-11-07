import React from 'react';
import Image from 'next/image';

import AllChallengeContents from '@/app/academy/(workspace)/[id]/dashboard/components/AllChallengeContents';
import Menubar from '@/app/academy/(workspace)/[id]/dashboard/components/Menubar';
import Flex from '@/shared/components/Flex';
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
        <AllChallengeContents />
      </div>
    </Flex>
  );
}

export default AcademyDashBoardPage;
