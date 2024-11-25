import React from 'react';

import Sidebar from '@/app/profile/components/Sidebar';
import Flex from '@/shared/components/Flex';

interface ILayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <Flex rowColumn="center" className="size-full px-10 sm:px-20 sm:py-10">
      <section className="grid size-full min-h-[700px] max-w-[1000px] grid-cols-1 gap-4 bg-transparent lg:grid-cols-[min-content,auto] lg:bg-second-gradient">
        <Sidebar />
        <Flex className="h-full rounded-xl border border-solid border-gray-200 bg-white px-10 py-5">{children}</Flex>
      </section>
    </Flex>
  );
}
export default Layout;
