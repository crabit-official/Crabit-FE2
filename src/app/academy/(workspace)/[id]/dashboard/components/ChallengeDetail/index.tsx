'use client';

import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsTrash3Fill } from 'react-icons/bs';
import Image from 'next/image';

import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import BoxContainer from '@/shared/components/BoxContainer';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useDeleteChallenge from '@/shared/hooks/challenge/useDeleteChallenge';
import type { TDetailChallengeResult } from '@/shared/types/acadmy';

type TChallengeDetailProps = Omit<TDetailChallengeResult['result'], 'challengeStatusCounts'> & {
  academyId: number;
  releasedChallengeId: number;
};

function ChallengeDetail({ academyId, releasedChallengeId, releasedChallenge }: TChallengeDetailProps) {
  const { mutate } = useDeleteChallenge({ academyId });

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
            className="h-96 w-full rounded-2xl border border-solid border-gray-100 object-contain shadow-custom"
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
        <Toggle
          content={
            releasedChallenge?.fileUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${releasedChallenge.fileUrl}`}
                alt="file"
                width={400}
                height={400}
                className="size-full h-96 rounded-2xl border border-solid border-gray-200 bg-gray-50/50 object-contain"
              />
            ) : (
              '첨부파일이 없습니다.'
            )
          }
          title="첨부파일"
        />
        <Flex className="gap-4">
          <BoxContainer variant="border" className="flex w-full flex-col items-center px-4 py-5">
            <Typography size="h3" className="w-full text-start opacity-80">
              배정된 포인트
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Ⓟ {releasedChallenge?.points}
            </Typography>
          </BoxContainer>
          <BoxContainer variant="border" className="flex w-full flex-col items-center px-4 py-5">
            <Typography size="h3" className="w-full text-start opacity-80">
              총 일수
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Day {releasedChallenge?.totalDays}
            </Typography>
          </BoxContainer>
        </Flex>
        <BoxContainer variant="border" className="px-4 py-5">
          <Typography size="h4" className="opacity-80">
            챌린지 설명
          </Typography>
          <Typography size="h5" className="w-full text-start font-normal opacity-80" as="p">
            {releasedChallenge?.content}
          </Typography>

          {releasedChallenge?.description && (
            <>
              <hr className="my-4 h-1 w-full" />
              <Typography size="h5" as="p" className="text-xs opacity-60">
                챌린지 추가 설명
              </Typography>
              <Typography size="h5" className="w-full text-start font-normal opacity-80" as="p">
                {releasedChallenge.description}
              </Typography>
            </>
          )}
        </BoxContainer>
      </Flex>
    </Flex>
  );
}

export default ChallengeDetail;
