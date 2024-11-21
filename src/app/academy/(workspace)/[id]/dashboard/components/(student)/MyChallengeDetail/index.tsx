'use client';

import React from 'react';
import Image from 'next/image';

import CreateChallengeForm from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/CreateChallengeForm';
import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';

interface IMyChallengeDetailProps {
  academyId: number;
  challengeData: TMyChallengeProgressResult['result'];
  studentChallengeId: number;
}

function MyChallengeDetail({ challengeData, studentChallengeId, academyId }: IMyChallengeDetailProps) {
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-4">
      <div className="w-full">
        <Toggle
          title={challengeData.releasedChallenge.title}
          content={
            <Flex column="center" className="gap-4">
              <Typography size="h5" className="break-keep text-main-deep-pink">
                {getChallengeType(challengeData.releasedChallenge.challengeType)} • {getChallengeCategory(challengeData.releasedChallenge.challengeCategory)}
              </Typography>
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.releasedChallenge.thumbnailImageUrl}`}
                alt="thumbnail image"
                width={500}
                height={500}
                className="h-80 w-full rounded-2xl border border-solid border-gray-100 object-contain shadow-custom"
              />
              <Flex column="center" className="gap-2">
                <Typography size="h7" className="break-keep font-medium text-main-deep-pink" as="p">
                  DAY {challengeData.releasedChallenge.totalDays} • Ⓟ {challengeData.releasedChallenge.points}
                </Typography>
                <Typography size="h6" className="break-keep font-normal opacity-80" as="p">
                  {challengeData.releasedChallenge.content}
                </Typography>
                {challengeData?.releasedChallenge.description && (
                  <>
                    <Typography size="h5" as="p" className="mt-4 text-xs opacity-60">
                      챌린지 추가 설명
                    </Typography>
                    <Typography size="h6" className="break-keep font-normal opacity-80" as="p">
                      {challengeData.releasedChallenge.description}
                    </Typography>
                  </>
                )}
              </Flex>
            </Flex>
          }
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
        <Flex column="start" className="gap-4 rounded-xl border border-solid border-gray-100 bg-neutral-50 p-5 shadow-custom">
          파일뷰어 자리입니당... <br /> 아직 미완성 ..
        </Flex>
        <Flex column="center" className="relative w-full gap-4">
          {!challengeData.studentChallenge.hasTodayChallengeLog && (
            <Typography
              size="h5"
              className="absolute right-[-20px] top-10 hidden rounded-xl border border-solid border-gray-100 bg-gray-500 px-2 py-1 text-xs text-white sm:block lg:right-[-60px]"
            >
              🧐 오늘의 인증글을 올리지 않았어요
            </Typography>
          )}
          <CreateChallengeForm academyId={academyId} studentChallengeId={studentChallengeId} challengeData={challengeData} />
        </Flex>
      </div>
    </Flex>
  );
}

export default MyChallengeDetail;
