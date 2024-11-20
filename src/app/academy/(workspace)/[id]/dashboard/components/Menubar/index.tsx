'use client';

import React from 'react';

import MenuItem from '@/app/academy/(workspace)/[id]/dashboard/components/MenuItem';
import Flex from '@/shared/components/Flex';
import { PUBLIC_MENU } from '@/shared/constants/tab-menu';

interface IMenubarProps {
  academyId: number;
  activeTab: string;
}

function Menubar({ academyId, activeTab }: IMenubarProps) {
  return (
    <Flex column="start">
      <ul>
        <MenuItem title="카테고리" content={PUBLIC_MENU} academyId={academyId} activeTab={activeTab} />
      </ul>
    </Flex>
  );
}
export default Menubar;
