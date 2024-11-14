import React from 'react';
import Image from 'next/image';

import PrincipalDashBoardUIl from '@/app/academy/(workspace)/[id]/dashboard/components/(principal)/DashBoardUI';
import StudentDashBoardUI from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/DashBoardUI';
import Menubar from '@/app/academy/(workspace)/[id]/dashboard/components/Menubar';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { IAcademyProfile, IAcademyResponse, TAcademyInfoResult } from '@/shared/types/acadmy';

interface IAcademyDashBoardProps {
  params: {
    id: string;
  };
}

async function AcademyDashBoardPage({ params }: IAcademyDashBoardProps) {
  const academyData = await fetchData<TAcademyInfoResult>(`/api/v1/academies/${Number(params.id)}/details`, 'GET');
  const AcademyProfile = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');

  return (
    <Flex rowColumn="center" className="gap-2">
      <Flex row="start" className="relative h-40 w-full max-w-[1100px] px-6 md:h-60 md:px-0">
        <Flex column="center" className="w-full gap-1">
          <Typography size="h5" className="text-main-deep-pink">
            매일의 작은 성취를 통한 습관 형성
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            {academyData?.result?.academy?.name} 챌린지
          </Typography>
        </Flex>
        <Image src="/images/logo_goal.webp" alt="img" width={400} height={400} className="absolute right-0 top-0 hidden opacity-40 lg:block" />
      </Flex>
      <div className="flex flex-col gap-20 lg:grid lg:grid-cols-[180px,1fr] lg:gap-10 xl:gap-32">
        <Menubar />
        {AcademyProfile.result.academyRole === ACADEMY_ROLE.STUDENT ? (
          <StudentDashBoardUI academyId={Number(params.id)} />
        ) : (
          <PrincipalDashBoardUIl academyId={Number(params.id)} />
        )}
      </div>
    </Flex>
  );
}

export default AcademyDashBoardPage;
