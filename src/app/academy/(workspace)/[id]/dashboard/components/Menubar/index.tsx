'use client';

import React from 'react';

import MenuItem from '@/app/academy/(workspace)/[id]/dashboard/components/MenuItem';
import Flex from '@/shared/components/Flex';

function Menubar() {
  return (
    <Flex column="start">
      <ul>
        <MenuItem text="진행중인 챌린지" />
        <MenuItem text="진행 예정 챌린지" />
      </ul>
    </Flex>
  );
}
export default Menubar;
