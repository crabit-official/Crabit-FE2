import React from 'react';
import { cookies } from 'next/headers';

import SettingBar from '@/app/academy/(workspace)/[id]/setting/components/SettingBar';
import SettingInfo from '@/app/academy/(workspace)/[id]/setting/components/SettingInfo';
import Error from '@/features/academy/(workspace)/components/error';
import Container from '@/features/main/components/Container';
import type { CommonResponse } from '@/shared/apis/dto/response';
import Flex from '@/shared/components/Flex';
import type { IAcademyProfile } from '@/shared/types/acadmy';
import type { TGetAcademyInfoResponse } from '@/shared/types/manage';

interface ILayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}
async function Layout({ params, children }: ILayoutProps) {
  const cookieStore = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
    },
  });

  const academyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
    },
  });

  const profile = (await res.json()) as CommonResponse<IAcademyProfile>;
  const academy = (await academyRes.json()) as TGetAcademyInfoResponse;

  if (!profile.result.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <Container className="my-20 flex flex-col gap-14">
      <SettingInfo academyName={academy.result.academy.academyName} />
      <div className="grid size-full min-h-[600px] grid-cols-1 px-2 lg:grid-cols-[min-content,min-content,auto] lg:px-10">
        <SettingBar academyId={Number(params.id)} academyRole={profile?.result.academyRole} />
        <div className="mr-10 hidden h-full w-px bg-gray-200 lg:block" />
        <Flex className="py-5">{children}</Flex>
      </div>
    </Container>
  );
}
export default Layout;
