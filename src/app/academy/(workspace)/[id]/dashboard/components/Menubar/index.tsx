'use client';

import React from 'react';

import MenuItem from '@/app/academy/(workspace)/[id]/dashboard/components/MenuItem';
import Flex from '@/shared/components/Flex';
import { DASHBOARD_MENU } from '@/shared/constants/tab-menu';

interface IMenubarProps {
  academyId: number;
  activeTab: string;
}

function Menubar({ academyId, activeTab }: IMenubarProps) {
  return (
    <Flex column="start">
      <ul>
        <MenuItem title="진행중인 챌린지" content={DASHBOARD_MENU} academyId={academyId} activeTab={activeTab} />
        <MenuItem title="진행 예정 챌린지" content={DASHBOARD_MENU} academyId={academyId} activeTab={activeTab} />
      </ul>
    </Flex>
  );
}
export default Menubar;
