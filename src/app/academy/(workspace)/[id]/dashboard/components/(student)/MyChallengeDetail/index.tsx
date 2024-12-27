'use client';

import React from 'react';

import ChallengeStatusBar from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/ChallengeStatusBar/ChallengeStatusBar';
import CreateChallengeForm from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/CreateChallengeForm';
import Flex from '@/shared/components/Flex';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';

interface IMyChallengeDetailProps {
  academyId: number;
  challengeData: TMyChallengeProgressResult['result'];
  studentChallengeId: number;
}

function MyChallengeDetail({ challengeData, studentChallengeId, academyId }: IMyChallengeDetailProps) {
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-4">
      <Flex column="start" className="w-full gap-3">
        <ChallengeStatusBar
          challengeLogSubmissionStatus={challengeData.studentChallenge.challengeLogSubmissionStatus}
          totalDays={challengeData.releasedChallenge.totalDays}
          hasTodayChallengeLog={challengeData.studentChallenge.hasTodayChallengeLog}
          startedAt={challengeData.studentChallenge.startedAt}
        />
      </Flex>
      <div className="grid w-full grid-cols-1 gap-4">
        {/* <Flex column="start" className="gap-4 rounded-xl border border-solid border-gray-100 bg-neutral-50 p-5 shadow-custom">
          파일뷰어 자리입니당... <br /> 아직 미완성 ..
        </Flex> */}

        <Flex column="center" className="w-full gap-4">
          <CreateChallengeForm academyId={academyId} studentChallengeId={studentChallengeId} challengeData={challengeData} />
        </Flex>
      </div>
    </Flex>
  );
}

export default MyChallengeDetail;
