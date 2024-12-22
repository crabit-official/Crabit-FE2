'use client';

import React from 'react';
import { GoX } from 'react-icons/go';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useApplyChallenge from '@/shared/hooks/market/useApplyChallenge';
import type { TPublicChallengeDetailResult } from '@/shared/types/public';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface IModalProps {
  academyId: number;
  challengeData: TPublicChallengeDetailResult['result'];
  releasedChallengeId: number;
}

function PublicModal({ challengeData, academyId, releasedChallengeId }: IModalProps) {
  const router = useRouter();
  const { mutate } = useApplyChallenge(academyId);

  const handleApply = () => {
    mutate({ academyId, releasedChallengeId });
  };

  return (
    <div className="fixed left-0 top-0 z-50 size-full bg-black/60 backdrop-blur-sm" onClick={() => router.back()}>
      <Flex rowColumn="center" className="size-full px-4">
        <div
          className="relative flex min-h-[550px] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl bg-white sm:w-2/3"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <Flex className="relative p-4">
            <button type="button" className="absolute right-7 top-7 cursor-pointer font-bold text-black hover:text-main-pink" onClick={() => router.back()}>
              <GoX />
            </button>
            {challengeData?.academyPublicChallenge.thumbnailImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.academyPublicChallenge.thumbnailImageUrl}`}
                alt="thumbnail img"
                width={480}
                height={100}
                className="h-56 w-full rounded-xl border border-solid border-gray-100 bg-gray-50 object-contain"
              />
            ) : (
              <Image src="/images/test.jpeg" alt="default img" width={480} height={100} className="h-56 w-full rounded-xl object-cover" />
            )}
            <Flex row="start" className="absolute bottom-7 left-7 gap-1">
              <StateLabel
                label={getChallengeCategory(challengeData?.academyPublicChallenge.challengeCategory)}
                variant={getVariantByStatus(challengeData?.academyPublicChallenge.challengeCategory)}
              />
              <StateLabel
                label={getChallengeType(challengeData?.academyPublicChallenge.challengeType)}
                variant={getVariantByStatus(challengeData?.academyPublicChallenge.challengeType)}
              />
            </Flex>
          </Flex>

          <Flex column="between" className="h-full gap-4 px-4 pb-4">
            <Flex column="between" className="size-full">
              <BoxContainer variant="border" className="max-h-52 overflow-y-auto">
                <div>
                  <Typography size="h4" as="p" className="overflow-hidden whitespace-normal break-all opacity-80">
                    {challengeData.academyPublicChallenge.title}
                  </Typography>
                  <Typography size="h7" as="p" className="overflow-hidden whitespace-pre-wrap break-all font-normal opacity-60">
                    {challengeData.academyPublicChallenge.content}
                  </Typography>
                </div>
              </BoxContainer>

              <Flex row="between" className="gap-20 p-2">
                <Flex>
                  <Typography size="h7" as="p" className="break-keep text-xs font-normal opacity-60 sm:text-sm">
                    챌린지 기간 {challengeData?.academyPublicChallenge.totalDays}일 • 포인트{' '}
                    {formatNumberWithCommas(challengeData?.academyPublicChallenge.points)}
                    {challengeData?.academyPublicChallenge.fileUrl && ' • 파일 포함'}
                  </Typography>
                </Flex>
                <Flex row="start" className="items-center gap-2">
                  {challengeData?.releaseInstructorProfile.profileImageUrl ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.releaseInstructorProfile.profileImageUrl}`}
                      alt="profile img"
                      width={100}
                      height={100}
                      className="size-5 rounded-full border border-solid border-gray-100 object-cover"
                    />
                  ) : (
                    <Avatar size="xs" />
                  )}
                  <Typography size="h7" className="break-keep text-xs font-normal opacity-80 sm:text-sm">
                    {challengeData?.releaseInstructorProfile.nickname}
                  </Typography>
                </Flex>
              </Flex>
            </Flex>
            <Button type="button" onClick={() => handleApply()} className="font-medium text-white">
              챌린지 참여하기
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
}

export default PublicModal;
