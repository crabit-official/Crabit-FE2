import React from 'react';

import SettingList from '@/app/academy/(workspace)/[id]/setting/components/setting-list';
import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import Error from '@/features/academy/(workspace)/components/error';
import Container from '@/features/main/components/Container';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';

async function AcademySettingBoardPage({ params }: { params: { id: string } }) {
  const data = await getAcademyProfile(Number(params.id));

  if (!data?.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <Container>
      <div className="m-auto mt-10 max-w-[600px]">
        <Heading title="설정" subTitle="학원 관리의 모든 것" />
        <Spacing direction="vertical" size={24} />
        <SettingList id={params.id} academyRole={data.academyRole} />
      </div>
    </Container>
  );
}

export default AcademySettingBoardPage;
