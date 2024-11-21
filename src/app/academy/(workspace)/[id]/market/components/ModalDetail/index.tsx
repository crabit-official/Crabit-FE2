'use client';

import React, { useEffect, useState } from 'react';
import { GoX } from 'react-icons/go';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import FirstStep from '@/app/academy/(workspace)/[id]/market/components/Release/First';
import SecondStep from '@/app/academy/(workspace)/[id]/market/components/Release/Second';
import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import ProgressBar from '@/shared/components/ProgressBar';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useReleaseChallenge from '@/shared/hooks/market/useReleaseChallenge';
import useStepProgress from '@/shared/hooks/use-step-progress';
import type { IReleaseChallengeDTO, TChallengeDetail } from '@/shared/types/market';

export interface IChallengeValue extends IReleaseChallengeDTO {
  step: number;
}

type TModalDetailProps = TChallengeDetail['result'] & {
  academyId: number;
  challengeCoreId: number;
};
// TODO: 첨부파일
function ModalDetail({ challenge, teacher, academy, academyId, challengeCoreId }: TModalDetailProps) {
  let content;
  const router = useRouter();
  const step = useStepProgress(2);
  const [release, setRelease] = useState<boolean>(false);
  const { mutate } = useReleaseChallenge(academyId);
  const [values, setValues] = useState<IChallengeValue>({
    challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    description: null,
    points: 0,
    studentIdList: [],
    totalDays: 0,
    step: 1,
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
    if (values.step === 3) {
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
  }, [values, academyId, challengeCoreId, mutate]);

  if (release) {
    content = (
      <Flex column="between" className="size-full gap-10 px-4 py-6">
        <ProgressBar progress={step.currentProgress / 2} />
        <Flex column="start" className="gap-4">
          <Typography size="h2" className="px-2 opacity-80">
            우리 학원에 배포
          </Typography>
          {step.currentProgress === 1 && <FirstStep academyId={academyId} onNext={(data) => handleNext({ ...data })} />}
          {step.currentProgress === 2 && <SecondStep content={challenge.content} onNext={(data) => handleNext({ ...data })} onBack={handleBack} />}
        </Flex>
      </Flex>
    );
  } else {
    content = (
      <>
        <button type="button" className="absolute right-4 top-4 cursor-pointer font-bold text-black hover:text-main-pink" onClick={() => router.back()}>
          <GoX />
        </button>
        {challenge?.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge.thumbnailImageUrl}`}
            alt="thumbnail img"
            width={480}
            height={100}
            className="h-64 w-full object-cover"
          />
        ) : (
          <Image src="/images/test.jpeg" alt="default img" width={480} height={100} className="h-64 w-full object-cover" />
        )}
        <Flex column="between" className="h-full gap-4 p-6">
          <Flex column="start" className="gap-6">
            <Flex row="between" className="items-center">
              <Flex row="start" className="gap-2">
                <StateLabel label={getChallengeType(challenge?.challengeType)} variant={getVariantByStatus(challenge?.challengeType)} />
                <StateLabel label={getChallengeCategory(challenge?.challengeCategory)} variant={getVariantByStatus(challenge?.challengeCategory)} />
              </Flex>
              {teacher && academy && (
                <Typography size="h5" as="p" className="text-xs text-blue-950">
                  {academy?.academyName} • {teacher?.academyNickname}/{teacher?.memberName}
                </Typography>
              )}
            </Flex>
            <Flex column="start" className="gap-1 px-1">
              <Typography size="h4" className="break-keep">
                {challenge?.title}
              </Typography>
              <Typography size="h5" as="p" className="break-keep text-sm opacity-60">
                {challenge?.content}
              </Typography>
            </Flex>
          </Flex>
          <Flex row="start">
            <Typography size="h5" className="px-1 text-sm opacity-80">
              첨부파일 : {challenge?.fileUrl ? '첨부파일 내용' : '첨부파일이 존재하지 않습니다.'}
            </Typography>
          </Flex>
          <Button onClick={() => setRelease(true)} className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
            {challenge?.alreadyReleasedInAcademy ? '이미 학원에 배포된 챌린지입니다.' : '우리 학원에 배포'}
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-black/60 backdrop-blur-sm" onClick={() => router.back()}>
      <Flex rowColumn="center" className="size-full px-4">
        <div
          className="relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-2xl bg-white sm:w-2/3"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {content}
        </div>
      </Flex>
    </div>
  );
}

export default ModalDetail;
