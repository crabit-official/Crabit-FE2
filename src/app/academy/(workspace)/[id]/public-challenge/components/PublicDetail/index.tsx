'use client';

import React from 'react';
import Image from 'next/image';

import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useApplyChallenge from '@/shared/hooks/market/useApplyChallenge';
import type { TPublicChallengeDetailResult } from '@/shared/types/public';

interface IPublicDetailProps {
  academyId: number;
  challengeData: TPublicChallengeDetailResult['result'];
  releasedChallengeId: number;
}

function PublicDetail({ challengeData, academyId, releasedChallengeId }: IPublicDetailProps) {
  const { mutate } = useApplyChallenge(academyId);

  const handleApply = () => {
    mutate({ academyId, releasedChallengeId });
  };
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-6 py-20 md:w-3/5 md:px-0">
      <Flex column="center" className="w-full gap-1">
        <Flex row="start" className="items-center gap-2">
          <Typography size="h5" className="break-keep text-main-deep-pink">
            {getChallengeType(challengeData?.academyPublicChallenge.challengeType)} •{' '}
            {getChallengeCategory(challengeData?.academyPublicChallenge.challengeCategory)}
          </Typography>

          <Typography size="h5" as="p" className="py-2 text-xs opacity-60">
            by. {challengeData.releaseInstructorProfile.academyNickname}
          </Typography>
        </Flex>
        <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
          {challengeData?.academyPublicChallenge.title}
        </Typography>
      </Flex>
      <Flex column="center" className="w-full gap-4">
        {challengeData?.academyPublicChallenge.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.academyPublicChallenge.thumbnailImageUrl}`}
            alt="thumbnail img"
            width={400}
            height={400}
            className="size-full h-96 rounded-2xl border border-solid border-gray-100 object-contain shadow-custom"
          />
        ) : (
          <Image src="/images/test.jpeg" alt="default thumbnail img" width={300} height={300} className="h-96 w-full rounded-2xl object-cover" />
        )}
        <Toggle
          content={
            <div>
              {challengeData?.academyPublicChallenge.fileUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData?.academyPublicChallenge.fileUrl}`}
                  alt="file"
                  width={400}
                  height={400}
                  className="size-full h-96 rounded-2xl border border-solid border-gray-200 bg-gray-100 object-contain"
                />
              ) : (
                <Typography size="h5" as="p" className="text-sm">
                  첨부 파일이 존재하지 않습니다.
                </Typography>
              )}
            </div>
          }
          title="첨부 파일"
        />

        <Typography size="h7" as="p" className="break-keep font-normal opacity-60">
          챌린지 기간 {challengeData?.academyPublicChallenge.totalDays}일 • 포인트 {challengeData?.academyPublicChallenge.totalDays}일
        </Typography>
        <Typography size="h5" as="p" className="break-keep text-base opacity-80">
          {challengeData?.academyPublicChallenge.content}
        </Typography>
      </Flex>
      <Button type="button" className="mt-4 bg-main-deep-pink font-medium text-white" onClick={() => handleApply()}>
        첼린지 참여하기
      </Button>
    </Flex>
  );
}
export default PublicDetail;
