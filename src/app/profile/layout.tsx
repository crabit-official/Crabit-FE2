import React from 'react';

import Sidebar from '@/app/profile/components/Sidebar';
import Flex from '@/shared/components/Flex';

interface ILayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <Flex rowColumn="center" className="size-full px-6 sm:px-20 sm:py-10">
      <section className="grid size-full min-h-[700px] max-w-[1000px] grid-cols-1 gap-4 bg-transparent lg:grid-cols-[min-content,min-content,auto]">
        <Sidebar />
        <div className="mr-10 hidden h-full w-px bg-gray-200 lg:block" />
        <Flex className="h-full min-h-80 bg-white">{children}</Flex>
      </section>
    </Flex>
  );
}

export default Layout;
