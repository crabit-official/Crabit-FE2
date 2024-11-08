import React from 'react';
import Image from 'next/image';

import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IDetailChallengeResult } from '@/shared/types/acadmy';

interface IChallengeDetailProps {
  challenge: IDetailChallengeResult;
}

function ChallengeDetail({ challenge }: IChallengeDetailProps) {
  // 특정 챌린지에 참여하는 학생들의 진행도 관련 정보 리스트 조회

  return (
    <div className="grid-rows-[min-content, auto] grid w-full place-items-center">
      <Flex rowColumn="center" className="w-full max-w-[700px] gap-10 px-4 py-20">
        <Flex rowColumn="center" className="w-full gap-10">
          {challenge?.result.releasedChallenge.thumbnailImageUrl && (
            <Image
              className="h-80 w-full rounded-2xl bg-black object-contain"
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge?.result?.releasedChallenge.thumbnailImageUrl}`}
              alt="thumbnail image"
              width={300}
              height={300}
            />
          )}
          <Flex column="start" className="w-full px-1">
            <Flex row="start" className="items-center gap-2">
              <Typography size="h5" className="text-sm text-neutral-500">
                {getChallengeType(challenge?.result?.releasedChallenge.challengeType)}
              </Typography>
              <div className="h-3 w-px rounded-[1px] bg-neutral-500" />
              <Typography size="h5" className="text-sm text-neutral-500">
                {getChallengeCategory(challenge?.result?.releasedChallenge.challengeCategory)}
              </Typography>
            </Flex>
            <Typography size="h1" className="text-start">
              {challenge?.result.releasedChallenge.title}
            </Typography>
          </Flex>
        </Flex>
        <Flex column="center" className="w-full gap-1 px-1">
          <Typography size="h4" className="break-keep text-sm font-medium text-neutral-700 sm:text-base">
            📌 챌린지 진행 방법 : {challenge?.result?.releasedChallenge.content}
          </Typography>
          <Typography size="h4" className="break-keep text-sm font-medium text-neutral-700 sm:text-base">
            🗓️ 챌린지 기간 : {challenge?.result?.releasedChallenge.totalDays}
          </Typography>
          <Typography size="h4" className="break-keep text-sm font-medium text-neutral-700 sm:text-base">
            🎖️ 포인트 : Ⓟ {challenge?.result?.releasedChallenge.points}
          </Typography>
        </Flex>
      </Flex>
    </div>
  );
}
export default ChallengeDetail;
