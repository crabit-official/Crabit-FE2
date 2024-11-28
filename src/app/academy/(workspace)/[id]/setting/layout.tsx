import React from 'react';
import { IoMdSettings } from 'react-icons/io';

import SettingBar from '@/app/academy/(workspace)/[id]/setting/components/SettingBar';
import Error from '@/features/academy/(workspace)/components/error';
import Container from '@/features/main/components/Container';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
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
      <Flex row="start" className="items-center gap-4 px-10">
        <IoMdSettings size={65} className="opacity-60" />
        <Flex column="start">
          <Typography size="h6" className="gap-1 font-normal opacity-60">
            설정 페이지
          </Typography>
          <Typography size="h1" className="text-3xl font-bold">
            크래빗 수학학원
          </Typography>
        </Flex>
      </Flex>
      <div className="grid size-full min-h-[600px] grid-cols-1 px-10 lg:grid-cols-[min-content,min-content,auto]">
        <SettingBar academyId={Number(params.id)} />
        <div className="h-full w-px bg-gray-200" />
        <Flex className="py-5">{children}</Flex>
      </div>
    </Container>
  );
}
export default Layout;
