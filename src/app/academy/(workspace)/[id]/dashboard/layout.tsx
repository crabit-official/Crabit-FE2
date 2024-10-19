import React from 'react';

import Sidebar from '@/features/academy/(workspace)/components/dashboard/Sidebar';
import Trendbar from '@/features/academy/(workspace)/components/dashboard/Trendbar';
import Flex from '@/shared/components/Flex';

interface ILayout {
  children: React.ReactNode;

  modal: React.ReactNode;
}

function Layout({ children, modal }: ILayout) {
  return (
    <div className="xl:px-30 max-w-8xl container mx-auto pb-8 pt-12">
      <div className="grid grid-rows-[min-content_auto] gap-5 md:grid-cols-5 md:gap-0">
        <Sidebar />
        <Flex className="border-x md:col-span-3">
          {modal}
          {children}
        </Flex>
        <Trendbar />
      </div>
    </div>
  );
}

export default Layout;
