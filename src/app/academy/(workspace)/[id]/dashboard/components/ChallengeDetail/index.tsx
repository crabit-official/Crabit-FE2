'use client';

import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsTrash3Fill } from 'react-icons/bs';
import Image from 'next/image';

import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useApprovalChallenge from '@/shared/hooks/challenge/useDeleteChallenge';
import type { TDetailChallengeResult } from '@/shared/types/acadmy';

type TChallengeDetailProps = Omit<TDetailChallengeResult['result'], 'challengeStatusCounts'> & {
  academyId: number;
  releasedChallengeId: number;
};

// TODO: 첨부파일 처리
function ChallengeDetail({ academyId, releasedChallengeId, releasedChallenge }: TChallengeDetailProps) {
  const { mutate } = useApprovalChallenge({ academyId });

  const handleDelete = () => {
    mutate({ academyId, releasedChallengeId });
  };

  return (
    <Flex className="w-full">
      <Flex column="center" className="relative w-full gap-5 px-2 sm:px-0">
        <Flex column="center" className="absolute right-[-16px] top-[100px] mx-2 gap-4 rounded-xl bg-gray-100 p-4 sm:mx-0">
          <button type="button">
            <AiTwotoneEdit className="hover:text-main-deep-pink" />
          </button>
          <button type="button" onClick={handleDelete}>
            <BsTrash3Fill className="hover:text-main-deep-pink" />
          </button>
        </Flex>
        <Flex column="center" className="gap-1">
          <Typography size="h5" className="break-keep text-main-deep-pink">
            {getChallengeType(releasedChallenge?.challengeType)} • {getChallengeCategory(releasedChallenge?.challengeCategory)}
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            {releasedChallenge?.title}
          </Typography>
        </Flex>
        {releasedChallenge?.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${releasedChallenge?.thumbnailImageUrl}`}
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
              Ⓟ {releasedChallenge?.points}
            </Typography>
          </Flex>
          <Flex column="center" className="w-full items-center gap-4 rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
            <Typography size="h3" className="w-full text-start">
              총 일수
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Day {releasedChallenge?.totalDays}
            </Typography>
          </Flex>
        </Flex>
        <Flex className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
          <Typography size="h5" className="w-full text-start">
            {releasedChallenge?.fileUrl ? `첨부파일: ${releasedChallenge.fileUrl}` : '첨부파일이 없습니다.'}
          </Typography>
        </Flex>
        <Flex className="w-full items-center rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
          <Typography size="h5" className="w-full text-start font-normal opacity-80" as="p">
            {releasedChallenge?.content}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default ChallengeDetail;
