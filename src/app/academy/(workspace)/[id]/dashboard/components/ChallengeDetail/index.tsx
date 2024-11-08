import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsTrash3Fill } from 'react-icons/bs';
import Image from 'next/image';

import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IDetailChallengeResult } from '@/shared/types/acadmy';

interface IChallengeDetailProps {
  academyId: number;
  releasedChallengeId: number;
}

// TODO: 오류처리 및 첨부파일 처리
async function ChallengeDetail({ academyId, releasedChallengeId }: IChallengeDetailProps) {
  const challengeData = await fetchData<IDetailChallengeResult>(`/api/v1/academies/${academyId}/challenges/teachers/${releasedChallengeId}`, 'GET');

  if (!challengeData) {
    return <div>오류 발생</div>;
  }

  return (
    <Flex className="w-full">
      <Flex column="center" className="relative w-full gap-5 px-2 sm:px-0">
        <Flex column="center" className="absolute right-[-16px] top-[100px] mx-2 gap-4 rounded-xl bg-gray-100 p-4 sm:mx-0">
          <button type="button">
            <AiTwotoneEdit className="hover:text-main-deep-pink" />
          </button>
          <button type="button">
            <BsTrash3Fill className="hover:text-main-deep-pink" />
          </button>
        </Flex>
        <Flex column="center" className="gap-1">
          <Typography size="h5" className="break-keep text-main-deep-pink">
            {getChallengeType(challengeData?.result?.releasedChallenge?.challengeType)} •{' '}
            {getChallengeCategory(challengeData?.result?.releasedChallenge?.challengeCategory)}
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            {challengeData?.result?.releasedChallenge?.title}
          </Typography>
        </Flex>
        {challengeData?.result?.releasedChallenge?.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeData?.result?.releasedChallenge?.thumbnailImageUrl}`}
            alt="test"
            width={500}
            height={500}
            className="h-96 w-full rounded-2xl border border-solid border-gray-100 object-cover shadow-custom"
          />
        ) : (
          <Image
            src="/images/test.jpeg"
            alt="test"
            width={500}
            height={500}
            className="h-96 w-full rounded-2xl border border-solid border-gray-100 object-cover shadow-custom"
          />
        )}
        <Flex className="gap-4">
          <Flex column="center" className="w-full items-center gap-4 rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
            <Typography size="h3" className="w-full text-start">
              배정된 포인트
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Ⓟ {challengeData?.result?.releasedChallenge?.points}
            </Typography>
          </Flex>
          <Flex column="center" className="w-full items-center gap-4 rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
            <Typography size="h3" className="w-full text-start">
              총 일수
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Day {challengeData?.result?.releasedChallenge?.totalDays}
            </Typography>
          </Flex>
        </Flex>
        <Flex className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
          <Typography size="h5" className="w-full text-start">
            {challengeData?.result?.releasedChallenge?.fileUrl ? `첨부파일: ${challengeData?.result?.releasedChallenge.fileUrl}` : '첨부파일이 없습니다.'}
          </Typography>
        </Flex>
        <Flex className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
          <Typography size="h5" className="w-full text-start font-normal opacity-80" as="p">
            {challengeData?.result?.releasedChallenge?.content}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default ChallengeDetail;
