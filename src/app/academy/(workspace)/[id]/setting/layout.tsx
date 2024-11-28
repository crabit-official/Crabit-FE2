import React from 'react';

import SettingBar from '@/app/academy/(workspace)/[id]/setting/components/SettingBar';
import SettingInfo from '@/app/academy/(workspace)/[id]/setting/components/SettingInfo';
import Error from '@/features/academy/(workspace)/components/error';
import Container from '@/features/main/components/Container';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';

interface ILayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
async function Layout({ params, children }: ILayoutProps) {
  const res = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');

  if (!res.result.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <Container className="my-20 flex flex-col gap-14">
      <SettingInfo />
      <div className="grid size-full min-h-[600px] grid-cols-1 px-10 lg:grid-cols-[min-content,min-content,auto]">
        <SettingBar academyId={Number(params.id)} />
        <div className="h-full w-px bg-gray-200" />
        <Flex className="py-5">{children}</Flex>
      </div>
    </Container>
  );
}
export default Layout;
