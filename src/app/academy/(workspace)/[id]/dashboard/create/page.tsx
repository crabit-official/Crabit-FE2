'use client';

import { useEffect, useState } from 'react';

import First from '@/app/academy/(workspace)/[id]/dashboard/create/components/First';
import LastStep from '@/app/academy/(workspace)/[id]/dashboard/create/components/Last';
import MultiStepProgress from '@/app/academy/(workspace)/[id]/dashboard/create/components/MultiStepProgress';
import Second from '@/app/academy/(workspace)/[id]/dashboard/create/components/Second';
import Third from '@/app/academy/(workspace)/[id]/dashboard/create/components/Third';
import useCreateChallenges from '@/features/academy/(workspace)/hooks/challenges/use-create-challenges';
import Flex from '@/shared/components/Flex';
import { CHALLENGE_CATEGORY, CHALLENGE_PARTICIPATION_METHODS, MARKET_VISIBILITY_CATEGORIES } from '@/shared/enums/challenge';
import useStepProgress from '@/shared/hooks/use-step-progress';
import type { IAcademyChallenges } from '@/shared/types/acadmy';

export interface IChallengeValue extends IAcademyChallenges {
  step: number;
}

const LAST_STEP = 4;

function ChallengeCreatePage({ params }: { params: { id: string } }) {
  const step = useStepProgress(LAST_STEP);
  const { mutate } = useCreateChallenges(Number(params.id));

  const [values, setValues] = useState<IChallengeValue>({
    challengeCategory: CHALLENGE_CATEGORY.ETC,
    challengeMarketVisibility: MARKET_VISIBILITY_CATEGORIES.PUBLIC,
    challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    content: '',
    fileUrl: '',
    points: 0,
    step: 1,
    studentIdList: [],
    thumbnailImageUrl: '',
    title: '',
    totalDays: 0,
  });

  const handleInfoChange = (infoValues: Partial<IChallengeValue>) => {
    setValues((prev) => ({
      ...prev,
      ...infoValues,
      step: prev.step + 1,
    }));
  };

  const handleNext = (currentData: Partial<IChallengeValue>) => {
    handleInfoChange(currentData);
    step.addSteps();
  };

  const handleBack = () => {
    step.minusSteps();
    setValues((prev) => ({
      ...prev,
      step: prev.step - 1,
    }));
  };

  useEffect(() => {
    if (values.step === LAST_STEP) {
      mutate({
        academyId: Number(params.id),
        challengeData: {
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
  }, [values, params.id, mutate]);

  return (
    <Flex className="w-full">
      <Flex rowColumn="center" className="w-full gap-10 md:w-2/3 lg:w-1/2">
        <MultiStepProgress {...step}>
          {step.currentProgress === 1 && <First onNext={(data) => handleNext({ ...data })} />}
          {step.currentProgress === 2 && <Second onNext={(data) => handleNext({ ...data })} onBack={handleBack} />}
          {step.currentProgress === 3 && <Third onNext={(data) => handleNext({ ...data })} onBack={handleBack} academyId={1} />}
          {step.currentProgress === 4 && <LastStep />}
        </MultiStepProgress>
      </Flex>
    </Flex>
  );
}
export default ChallengeCreatePage;
