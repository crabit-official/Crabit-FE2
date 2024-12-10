import React from 'react';
import { cookies } from 'next/headers';

import PrincipalChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/(principal)/ChallengeDetail';
import StudentChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/ChallengeDetail';
import DetailTab from '@/app/academy/(workspace)/[id]/dashboard/components/DetailTab';
import Flex from '@/shared/components/Flex';
import { ALL_TAB, PRINCIPAL_TAB_MENU, STUDENT_TAB_MENU } from '@/shared/constants/tab-menu';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { TAcademyMemberProfileResponse, TDetailChallengeResult } from '@/shared/types/acadmy';

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
  const cookieStore = cookies();

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
    },
  });

  const academyProfile = (await res2.json()) as TAcademyMemberProfileResponse;

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}/challenges/teachers/${Number(params.challengeId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
      },
    });

    const challengeDetail = (await res.json()) as TDetailChallengeResult;

    const isChallengeAuthorized =
      academyProfile.result.memberId === challengeDetail?.result?.teacher.memberId || academyProfile?.result?.academyRole === ACADEMY_ROLE.PRINCIPAL;

    content = (
      <>
        <DetailTab
          menu={isChallengeAuthorized ? PRINCIPAL_TAB_MENU : ALL_TAB}
          academyId={Number(params.id)}
          releasedChallengeId={Number(params.challengeId)}
          type="dashboard"
        />
        {/* @ts-expect-error Async Server Component */}
        <PrincipalChallengeDetail tabName={searchParams.tab} releasedChallengeId={Number(params.challengeId)} academyId={Number(params.id)} />
      </>
    );
  }

  return (
    <Flex className="w-full">
      <Flex column="start" className="w-full lg:w-2/3">
        {content}
      </Flex>
    </Flex>
  );
}

export default ContentDetail;
