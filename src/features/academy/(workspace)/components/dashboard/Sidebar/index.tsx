'use client';

import React from 'react';

import ChallengeMenu from '@/features/academy/(workspace)/components/dashboard/ChallengeMenu';
import Profile from '@/features/academy/(workspace)/components/dashboard/Profile';
import Flex from '@/shared/components/Flex';
import { useDraggable } from '@/shared/hooks/useDraggable';

function Sidebar() {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDraggable<HTMLUListElement>();

  return (
    <Flex column="center" className="items-center gap-14 md:flex md:items-start md:justify-start">
      <Flex className="hidden max-w-52 md:flex">
        <Profile />
      </Flex>
      <ul
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        className="scrollbar-hide flex max-w-80 gap-2 overflow-x-scroll sm:max-w-none md:flex-col lg:gap-4"
      >
        <ChallengeMenu label="미라클 모닝" />
        <ChallengeMenu label="코딩 모닝" />
        <ChallengeMenu label="미라클 모닝" />
        <ChallengeMenu label="코딩 모닝" />
        <ChallengeMenu label="미라클 모닝" />
      </ul>
    </Flex>
  );
}

export default Sidebar;
