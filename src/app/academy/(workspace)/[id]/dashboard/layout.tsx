import React from 'react';

import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import AcademyTitle from '@/features/academy/(workspace)/components/dashboard/academy-title';
import ChatView from '@/features/academy/(workspace)/components/dashboard/chat-view';
import Error from '@/features/academy/(workspace)/components/error';
import Flex from '@/shared/components/Flex';

interface ILayout {
  children: React.ReactNode;
  params: { id: string };
}

async function Layout({ children, params }: ILayout) {
  const data = await getAcademyProfile(params.id);

  if (!data?.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <div className="xl:px-30 max-w-8xl container mx-auto pb-8 pt-12">
      <div className="grid gap-10">
        <AcademyTitle />
        <ChatView />
        <Flex className="border-x">{children}</Flex>
      </div>
    </div>
  );
}

export default Layout;
