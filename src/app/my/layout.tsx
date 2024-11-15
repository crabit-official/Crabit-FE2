'use client';

import React from 'react';

import InvitationModal from './components/invitation-modal';

import Flex from '@/shared/components/Flex';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex column="center" className="items-center">
      {/* <SideBar /> */}
      <section className="flex-1">{children}</section>
      <InvitationModal />
    </Flex>
  );
}

export default Layout;
