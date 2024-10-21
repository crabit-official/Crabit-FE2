import React from 'react';

import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import ChallengeModal from '@/features/academy/(workspace)/components/dashboard/ChallengeModal';
import Sidebar from '@/features/academy/(workspace)/components/dashboard/Sidebar';
import Trendbar from '@/features/academy/(workspace)/components/dashboard/Trendbar';
import Error from '@/features/academy/(workspace)/components/error';
import Flex from '@/shared/components/Flex';

interface ILayout {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { id: string };
}

async function Layout({ children, modal, params }: ILayout) {
  const role = await getAcademyProfile(params.id);

  if (!role) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <div className="xl:px-30 max-w-8xl container mx-auto pb-8 pt-12">
      <div className="grid grid-rows-[min-content_auto] gap-5 md:grid-cols-5 md:gap-0">
        <Sidebar role={role} />
        <Flex className="border-x md:col-span-3">
          {modal}
          {children}
          <ChallengeModal />
        </Flex>
        <Trendbar />
      </div>
    </div>
  );
}

export default Layout;
