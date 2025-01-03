import React from 'react';

import MyChallenge from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/MyChallenge';
import MyChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/MyChallengeDetail';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';

interface IStudentChallengeDetailProps {
  academyId: number;
  studentChallengeId: number;
  tabName: string;
}

async function StudentChallengeDetail({ tabName, academyId, studentChallengeId }: IStudentChallengeDetailProps) {
  const challengeData = await fetchData<TMyChallengeProgressResult>(`/api/v1/academies/${academyId}/challenges/students/${studentChallengeId}`, 'GET');

  return (
    <Flex rowColumn="center" className="z-10 mt-1 w-full gap-20 py-10">
      {(tabName === 'create' || !tabName) && (
        <MyChallengeDetail challengeData={challengeData.result} academyId={academyId} studentChallengeId={studentChallengeId} />
      )}
      {tabName === 'my-challenge' && <MyChallenge academyId={academyId} studentChallengeId={studentChallengeId} />}
    </Flex>
  );
}

export default StudentChallengeDetail;
