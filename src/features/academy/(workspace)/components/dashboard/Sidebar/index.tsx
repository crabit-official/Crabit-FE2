import React from 'react';

import ChallengeMenu from '@/features/academy/(workspace)/components/dashboard/ChallengeMenu';
import Index from '@/features/academy/(workspace)/components/dashboard/Profile';
import Flex from '@/shared/components/Flex';

function Sidebar() {
  return (
    <Flex column="center" className="min-w-[150px] items-center gap-14 md:flex md:items-start md:justify-start">
      <Flex className="hidden max-w-52 md:flex">
        <Index />
      </Flex>
      <Flex row="center" className="max-w-96 gap-4 overflow-x-scroll md:flex-col">
        <ChallengeMenu label="미라클 모닝" />
        <ChallengeMenu label="코딩 모닝" />
        <ChallengeMenu label="미라클 모닝" />
        <ChallengeMenu label="코딩 모닝" />
        <ChallengeMenu label="미라클 나dlt" />
        <ChallengeMenu label="미라클 모닝" />
        <ChallengeMenu label="코딩 모닝" />
        <ChallengeMenu label="미라클 나잇" />
      </Flex>
    </Flex>
  );
}

export default Sidebar;
