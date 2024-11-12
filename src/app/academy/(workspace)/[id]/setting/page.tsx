import React from 'react';

import SettingList from '@/app/academy/(workspace)/[id]/setting/components/setting-list';
import Error from '@/features/academy/(workspace)/components/error';
import Container from '@/features/main/components/Container';
import { fetchData } from '@/shared/apis/fetch-data';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';
import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';

async function AcademySettingBoardPage({ params }: { params: { id: string } }) {
  const res = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');

  if (!res.result.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <Container>
      <div className="m-auto mt-10 max-w-[600px]">
        <Heading title="설정" subTitle="학원 관리의 모든 것" />
        <Spacing direction="vertical" size={24} />
        <SettingList id={params.id} academyRole={res?.result?.academyRole} />
      </div>
    </Container>
  );
}

export default AcademySettingBoardPage;
