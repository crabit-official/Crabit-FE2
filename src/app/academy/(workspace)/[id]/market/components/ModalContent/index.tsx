'use client';

import React from 'react';
import { GoX } from 'react-icons/go';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';
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
  const sanitizeContent = DOMPurify.sanitize(challenge.content);

  return (
    <>
      <div className="relative w-full">
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
        <Flex row="start" className="absolute left-5 top-5 gap-1">
          <StateLabel label={getChallengeType(challenge?.challengeType)} variant={getVariantByStatus(challenge?.challengeType)} />
          <StateLabel label={getChallengeCategory(challenge?.challengeCategory)} variant={getVariantByStatus(challenge?.challengeCategory)} />
        </Flex>
      </div>
      <Flex column="between" className="h-full gap-4 p-6">
        <Flex column="start" className="gap-4">
          <Flex row="end" className="items-center">
            {teacher && academy && (
              <Typography size="h5" as="p" className="text-xs text-blue-950">
                {academy?.academyName} • {teacher?.nickname}/{teacher?.name}
              </Typography>
            )}
          </Flex>
          <BoxContainer variant="border" className="max-h-52 gap-1 overflow-y-auto">
            <div>
              <Typography size="h4" className="overflow-hidden whitespace-normal break-all">
                {challenge?.title}
              </Typography>
              <Typography
                size="h5"
                as="p"
                className="overflow-hidden whitespace-pre-wrap break-all text-sm opacity-60"
                dangerouslySetInnerHTML={{ __html: sanitizeContent }}
              />
            </div>
          </BoxContainer>
        </Flex>
        <Flex row="start">
          {challenge?.fileUrl ? (
            <Flex row="start" className="gap-2">
              <Typography size="h6" className="w-28 px-1 text-sm opacity-80 sm:w-fit">
                첨부파일 :
              </Typography>
              <Link target="_blank" href={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge?.fileUrl}`} download className="text-sm text-blue-500 underline">
                {challenge?.fileUrl.split('_').slice(1).join('_')}
              </Link>
            </Flex>
          ) : null}
        </Flex>
        <Button onClick={() => setRelease(true)} className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
          {challenge?.alreadyReleasedInAcademy ? '이미 가져온 챌린지입니다' : '우리 기관에 가져오기'}
        </Button>
      </Flex>
    </>
  );
}

export default ModalContent;
