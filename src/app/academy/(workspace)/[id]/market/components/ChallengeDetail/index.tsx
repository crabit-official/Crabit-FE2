'use client';

import React, { useEffect, useState } from 'react';

import LastStep from '@/app/academy/(workspace)/[id]/dashboard/create/components/Last';
import MultiStepProgress from '@/app/academy/(workspace)/[id]/dashboard/create/components/MultiStepProgress';
import ChallengeContent from '@/app/academy/(workspace)/[id]/market/components/ChallengeContent';
import FirstStep from '@/app/academy/(workspace)/[id]/market/components/Release/First';
import SecondStep from '@/app/academy/(workspace)/[id]/market/components/Release/Second';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useReleaseChallenge from '@/shared/hooks/market/useReleaseChallenge';
import useHandleStepChallenge from '@/shared/hooks/useHandleStepChallenge';
import type { IReleaseChallengeDTO, TChallengeDetail } from '@/shared/types/market';

type TChallengeDetailProps = TChallengeDetail['result'] & {
  academyId: number;
  challengeCoreId: number;
};

function ChallengeDetail({ challenge, teacher, academy, academyId, challengeCoreId }: TChallengeDetailProps) {
  let content;
  const MAX_STEP = 3;
  const [release, setRelease] = useState<boolean>(false);
  const { mutate } = useReleaseChallenge(academyId);
  const { values, handleBack, handleNext, step } = useHandleStepChallenge<IReleaseChallengeDTO>(MAX_STEP, {
    challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    description: null,
    points: 0,
    studentIdList: [],
    totalDays: 0,
  });

  useEffect(() => {
    if (step.currentProgress === MAX_STEP) {
      mutate({
        academyId,
        challengeCoreId,
        challengeData: {
          description: values.description,
          challengeParticipationMethod: values.challengeParticipationMethod,
          points: Number(values.points),
          studentIdList: values.studentIdList ?? [],
          totalDays: Number(values.totalDays),
        },
      });
    }
  }, [values, academyId, challengeCoreId, mutate, step.currentProgress]);

  if (release) {
    content = (
      <Flex column="between" className="size-full gap-10 px-4 py-6">
        <MultiStepProgress {...step}>
          <Flex column="start" className="gap-4">
            <Typography size="h2" className="px-9">
              우리 기관에 배포
            </Typography>
            <Flex rowColumn="center" className="w-full">
              {step.currentProgress === 1 && <FirstStep academyId={academyId} onNext={(data) => handleNext({ ...data })} />}
              {step.currentProgress === 2 && <SecondStep content={challenge.content} onNext={(data) => handleNext({ ...data })} onBack={handleBack} />}
              {step.currentProgress === 3 && <LastStep />}
            </Flex>
          </Flex>
        </MultiStepProgress>
      </Flex>
    );
  } else {
    content = <ChallengeContent academy={academy} teacher={teacher} challenge={challenge} setRelease={setRelease} />;
  }
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-6 py-20 md:w-3/5 md:px-0">
      {content}
    </Flex>
  );
}

export default ChallengeDetail;
