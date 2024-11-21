'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import LastStep from '@/app/academy/(workspace)/[id]/dashboard/create/components/Last';
import ModalContent from '@/app/academy/(workspace)/[id]/market/components/ModalContent';
import FirstStep from '@/app/academy/(workspace)/[id]/market/components/Release/First';
import SecondStep from '@/app/academy/(workspace)/[id]/market/components/Release/Second';
import Flex from '@/shared/components/Flex';
import ProgressBar from '@/shared/components/ProgressBar';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useReleaseChallenge from '@/shared/hooks/market/useReleaseChallenge';
import useHandleStepChallenge from '@/shared/hooks/useHandleStepChallenge';
import type { IReleaseChallengeDTO, TChallengeDetail } from '@/shared/types/market';

type TModalDetailProps = TChallengeDetail['result'] & {
  academyId: number;
  challengeCoreId: number;
};

function ModalDetail({ challenge, teacher, academy, academyId, challengeCoreId }: TModalDetailProps) {
  let content;
  const MAX_STEP = 3;
  const router = useRouter();
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
        <ProgressBar progress={step.currentProgress / MAX_STEP} />
        <Flex column="start" className="gap-4">
          <Typography size="h2" className="px-2 opacity-80">
            우리 학원에 배포
          </Typography>
          {step.currentProgress === 1 && <FirstStep academyId={academyId} onNext={(data) => handleNext({ ...data })} />}
          {step.currentProgress === 2 && <SecondStep content={challenge.content} onNext={(data) => handleNext({ ...data })} onBack={handleBack} />}
          {step.currentProgress === 3 && <LastStep />}
        </Flex>
      </Flex>
    );
  } else {
    content = <ModalContent teacher={teacher} challenge={challenge} academy={academy} setRelease={setRelease} />;
  }

  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-black/60 backdrop-blur-sm" onClick={() => router.back()}>
      <Flex rowColumn="center" className="size-full px-4">
        <div
          className="relative flex w-full max-w-[600px] flex-col overflow-hidden rounded-2xl bg-white sm:w-2/3"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {content}
        </div>
      </Flex>
    </div>
  );
}

export default ModalDetail;
