import React from 'react';

import PrincipalChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/(principal)/ChallengeDetail';
import StudentChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/ChallengeDetail';
import DetailTab from '@/app/academy/(workspace)/[id]/dashboard/components/DetailTab';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import { PRINCIPAL_TAB_MENU, STUDENT_TAB_MENU } from '@/shared/constants/tab-menu';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';

interface IContentDetailProps {
  params: {
    challengeId: string;
    id: string;
  };
  searchParams: {
    tab: string;
  };
}

async function ContentDetail({ params, searchParams }: IContentDetailProps) {
  const academyProfile = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');

  let content;

  if (academyProfile.result.academyRole === ACADEMY_ROLE.STUDENT) {
    content = (
      <>
        <DetailTab menu={STUDENT_TAB_MENU} academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} type="dashboard" />
        {/* @ts-expect-error Async Server Component */}
        <StudentChallengeDetail tabName={searchParams.tab} academyId={Number(params.id)} studentChallengeId={Number(params.challengeId)} />
      </>
    );
  } else {
    content = (
      <>
        <DetailTab menu={PRINCIPAL_TAB_MENU} academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} type="dashboard" />
        {/* @ts-expect-error Async Server Component */}
        <PrincipalChallengeDetail tabName={searchParams.tab} releasedChallengeId={Number(params.challengeId)} academyId={Number(params.id)} />
      </>
    );
  }

  return (
    <Flex className="w-full">
      <Flex column="start" className="min-h-[550px] w-full lg:w-2/3">
        {content}
      </Flex>
    </Flex>
  );
}

export default ContentDetail;
