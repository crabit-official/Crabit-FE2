import React from 'react';

import SideBar from '@/features/academy/my/components/Sidebar/side-bar';
import Flex from '@/shared/components/Flex';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex column="center" className="p-5 md:flex-row">
      <SideBar />
      <section className="flex-1">{children}</section>
    </Flex>
  );
}

export default Layout;
