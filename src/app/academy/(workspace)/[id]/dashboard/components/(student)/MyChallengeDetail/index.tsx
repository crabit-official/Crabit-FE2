'use client';

import React from 'react';
import { FaFile } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import ChallengeStatusBar from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/ChallengeStatusBar/ChallengeStatusBar';
import CreateChallengeForm from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/CreateChallengeForm';
import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface IMyChallengeDetailProps {
  academyId: number;
  challengeData: TMyChallengeProgressResult['result'];
  studentChallengeId: number;
}

function MyChallengeDetail({ challengeData, studentChallengeId, academyId }: IMyChallengeDetailProps) {
  console.log(challengeData);

  return (
    <Flex rowColumn="center" className="w-full gap-10 px-4">
      <Flex column="start" className="w-full gap-3">
        <ChallengeStatusBar
          challengeLogSubmissionStatus={challengeData.studentChallenge.challengeLogSubmissionStatus}
          totalDays={challengeData.releasedChallenge.totalDays}
          hasTodayChallengeLog={challengeData.studentChallenge.hasTodayChallengeLog}
          startedAt={challengeData.studentChallenge.startedAt}
        />
        <Toggle
          title={challengeData.releasedChallenge.title}
          content={
            <Flex column="center" className="gap-4">
              <Typography size="h5" className="break-keep text-main-deep-pink">
                {getChallengeType(challengeData.releasedChallenge.challengeType)} • {getChallengeCategory(challengeData.releasedChallenge.challengeCategory)}
              </Typography>
              {challengeData.releasedChallenge.thumbnailImageUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.releasedChallenge.thumbnailImageUrl}`}
                  alt="thumbnail image"
                  width={500}
                  height={500}
                  className="h-64 w-full rounded-2xl border border-solid border-gray-100 object-contain shadow-custom"
                />
              ) : null}
              <Flex column="center" className="gap-2">
                <Typography size="h6" className="break-keep font-medium text-main-deep-pink" as="p">
                  DAY {challengeData.releasedChallenge.totalDays} • Ⓟ {formatNumberWithCommas(challengeData.releasedChallenge.points)}
                </Typography>
                <Typography size="h5" className="overflow-hidden whitespace-pre-wrap break-all font-normal opacity-80" as="p">
                  {challengeData.releasedChallenge.content}
                </Typography>
                {challengeData?.releasedChallenge.description && (
                  <>
                    <Typography size="h5" as="p" className="mt-4 text-xs opacity-60">
                      챌린지 추가 설명
                    </Typography>
                    <Typography size="h6" className="overflow-hidden whitespace-pre-wrap break-all font-normal opacity-80" as="p">
                      {challengeData.releasedChallenge.description}
                    </Typography>
                  </>
                )}
              </Flex>
            </Flex>
          }
        />
      </Flex>
      <div className="grid w-full grid-cols-1 gap-4">
        {/* TODO: 챌린지 올린 사람이, 올린 파일을 볼 수 있는 자리. */}
        {challengeData.releasedChallenge.fileUrl && (
          <>
            <Typography size="h6" className="break-keep font-bold opacity-80" as="p">
              첨부 파일
            </Typography>
            <Flex row="start">
              <FaFile className="mr-2" />
              <Link
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData.releasedChallenge.fileUrl}`}
                download
                className="text-blue-500 underline"
              >
                {challengeData.releasedChallenge.fileUrl.split('_').slice(1).join('_')}
              </Link>
            </Flex>
          </>
        )}
        {/* <Flex column="start" className="gap-4 rounded-xl border border-solid border-gray-100 bg-neutral-50 p-5 shadow-custom">
          파일뷰어 자리입니당... <br /> 아직 미완성 ..
        </Flex> */}
        <Flex column="center" className="w-full gap-4">
          <CreateChallengeForm academyId={academyId} studentChallengeId={studentChallengeId} challengeData={challengeData} />
        </Flex>
      </div>
    </Flex>
  );
}

export default MyChallengeDetail;
