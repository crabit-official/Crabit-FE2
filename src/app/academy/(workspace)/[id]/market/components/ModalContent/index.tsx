'use client';

import React from 'react';
import { GoX } from 'react-icons/go';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TChallengeDetail } from '@/shared/types/market';

type TContentProps = TChallengeDetail['result'] & {
  setRelease: (status: boolean) => void;
};

function ModalContent({ challenge, teacher, academy, setRelease }: TContentProps) {
  const router = useRouter();

  return (
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
        <Flex column="start" className="gap-4">
          <Flex row="between" className="items-center">
            <Flex row="start" className="gap-2">
              <StateLabel label={getChallengeType(challenge?.challengeType)} variant={getVariantByStatus(challenge?.challengeType)} />
              <StateLabel label={getChallengeCategory(challenge?.challengeCategory)} variant={getVariantByStatus(challenge?.challengeCategory)} />
            </Flex>
            {teacher && academy && (
              <Typography size="h5" as="p" className="text-xs text-blue-950">
                {academy?.academyName} • {teacher?.nickname}/{teacher?.name}
              </Typography>
            )}
          </Flex>
          <BoxContainer variant="border" className="gap-1">
            <Typography size="h4" className="break-keep">
              {challenge?.title}
            </Typography>
            <Typography size="h5" as="p" className="break-keep text-sm opacity-60">
              {challenge?.content}
            </Typography>
          </BoxContainer>
        </Flex>
        <Flex row="start">
          <Typography size="h5" className="px-1 text-sm opacity-80">
            첨부파일 : {challenge?.fileUrl ? '첨부파일이 존재하는 챌린지 입니다.' : '첨부파일이 존재하지 않습니다.'}
          </Typography>
        </Flex>
        <Button onClick={() => setRelease(true)} className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
          {challenge?.alreadyReleasedInAcademy ? '이미 학원에 배포된 챌린지입니다.' : '우리 학원에 배포'}
        </Button>
      </Flex>
    </>
  );
}

export default ModalContent;
