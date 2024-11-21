'use client';

import { useEffect } from 'react';

import First from '@/app/academy/(workspace)/[id]/dashboard/create/components/First';
import LastStep from '@/app/academy/(workspace)/[id]/dashboard/create/components/Last';
import MultiStepProgress from '@/app/academy/(workspace)/[id]/dashboard/create/components/MultiStepProgress';
import Second from '@/app/academy/(workspace)/[id]/dashboard/create/components/Second';
import Third from '@/app/academy/(workspace)/[id]/dashboard/create/components/Third';
import useCreateChallenges from '@/features/academy/(workspace)/hooks/challenges/use-create-challenges';
import Flex from '@/shared/components/Flex';
import { CHALLENGE_CATEGORY, CHALLENGE_PARTICIPATION_METHODS, MARKET_VISIBILITY_CATEGORIES } from '@/shared/enums/challenge';
import useHandleStepChallenge from '@/shared/hooks/useHandleStepChallenge';
import type { IAcademyChallenges } from '@/shared/types/acadmy';

function ChallengeCreatePage({ params }: { params: { id: string } }) {
  const LAST_STEP = 4;
  const { mutate } = useCreateChallenges(Number(params.id));
  const { values, step, handleBack, handleNext } = useHandleStepChallenge<IAcademyChallenges>(LAST_STEP, {
    challengeCategory: CHALLENGE_CATEGORY.ETC,
    challengeMarketVisibility: MARKET_VISIBILITY_CATEGORIES.PUBLIC,
    challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    content: '',
    fileUrl: '',
    points: 0,
    studentIdList: [],
    thumbnailImageUrl: '',
    title: '',
    totalDays: 0,
    description: null,
  });

  useEffect(() => {
    if (step.currentProgress === LAST_STEP) {
      mutate({
        academyId: Number(params.id),
        challengeData: {
          description: values.description,
          fileUrl: values.fileUrl,
          title: values.title,
          challengeCategory: values.challengeCategory,
          challengeMarketVisibility: values.challengeMarketVisibility,
          challengeParticipationMethod: values.challengeParticipationMethod,
          content: values.content ?? '',
          thumbnailImageUrl: values.thumbnailImageUrl,
          points: Number(values.points),
          studentIdList: values.studentIdList ?? [],
          totalDays: Number(values.totalDays),
        },
      });
    }
  }, [values, params.id, mutate, step.currentProgress]);

  return (
    <Flex className="w-full">
      <Flex rowColumn="center" className="w-full gap-10 md:w-2/3 lg:w-1/2">
        <MultiStepProgress {...step}>
          {step.currentProgress === 1 && <First onNext={(data) => handleNext({ ...data })} />}
          {step.currentProgress === 2 && <Second onNext={(data) => handleNext({ ...data })} onBack={handleBack} />}
          {step.currentProgress === 3 && <Third onNext={(data) => handleNext({ ...data })} onBack={handleBack} academyId={Number(params.id)} />}
          {step.currentProgress === 4 && <LastStep />}
        </MultiStepProgress>
      </Flex>
    </Flex>
  );
}
export default ChallengeCreatePage;
