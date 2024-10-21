'use client';

import React, { useCallback, useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';

import ChallengeMenu from '@/features/academy/(workspace)/components/dashboard/ChallengeMenu';
import Profile from '@/features/academy/(workspace)/components/dashboard/Profile';
import MenuItem from '@/features/main/components/MenuItem';
import Flex from '@/shared/components/Flex';
import { useDraggable } from '@/shared/hooks/useDraggable';

interface ISidebarProps {
  role: string;
}

function Sidebar({ role }: ISidebarProps) {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDraggable<HTMLUListElement>();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return (
    <Flex row="center" className="items-center gap-3 md:flex md:flex-col md:items-start md:justify-start md:gap-14">
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
      {role !== 'STUDENT' && (
        <button type="button" onClick={toggleOpen} className="relative w-fit md:w-full">
          <FaCirclePlus size={20} className="text-slate-500 hover:text-black" />
          {isOpen && (
            <div className="absolute right-0 z-10 w-[150px] max-w-[170px] overflow-hidden rounded-xl bg-white text-sm shadow-md md:left-0 md:top-10 md:w-full">
              <div className="flex cursor-pointer flex-col">
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  label="챌린저 추가하기"
                />
              </div>
            </div>
          )}
        </button>
      )}
    </Flex>
  );
}

export default Sidebar;
