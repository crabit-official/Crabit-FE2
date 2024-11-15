'use client';

import React from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { IoMdPhotos } from 'react-icons/io';
import Image from 'next/image';

import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { useImage } from '@/features/academy/(workspace)/hooks/use-image';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';

interface IMyChallengeDetailProps {
  challengeData: TMyChallengeProgressResult['result'];
}

function MyChallengeDetail({ challengeData }: IMyChallengeDetailProps) {
  const { filePreview, handleChangeFile } = useImage();

  const { register } = useForm<FieldValues>({});

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
              <Flex column="center" className="gap-1">
                <Typography size="h7" className="break-keep font-medium text-main-deep-pink">
                  DAY {challengeData.releasedChallenge.totalDays} • Ⓟ {challengeData.releasedChallenge.points}
                </Typography>
                <Typography size="h7" className="break-keep font-normal opacity-80">
                  {challengeData.releasedChallenge.content}
                </Typography>
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
          <Typography
            size="h5"
            className="absolute right-[-20px] top-10 rounded-xl border border-solid border-gray-100 bg-gray-500 px-2 py-1 text-xs text-white lg:right-[-60px]"
          >
            {!challengeData.studentChallenge.hasTodayChallengeLog && '🧐 오늘의 인증글을 올리지 않았어요'}
          </Typography>
          <form className="flex flex-col gap-4 rounded-xl border border-solid border-gray-100 p-5 shadow-custom">
            <Flex column="start" className="gap-2">
              <Typography size="h3" className="opacity-80">
                챌린지 인증글 올리기
              </Typography>
              <Typography size="h5" as="p" className="text-xs opacity-60">
                tip ) 어찌고 저찌고 어찌고 저찌고...
              </Typography>
              <Flex as="figure" row="start" className="mt-4">
                <label
                  htmlFor="file"
                  className="flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-solid border-gray-100 bg-neutral-50"
                >
                  {filePreview ? (
                    <Image src={filePreview} width={200} height={200} className="h-52 w-full overflow-hidden rounded-xl object-contain" alt="img" />
                  ) : (
                    <IoMdPhotos size={30} />
                  )}
                </label>
                <input type="file" id="file" {...register('file')} onChange={handleChangeFile} className="hidden" />
              </Flex>
              <Button type="submit" className="font-medium text-white" disabled={challengeData.studentChallenge.hasTodayChallengeLog}>
                {challengeData.studentChallenge.hasTodayChallengeLog ? '오늘의 챌린지를 이미 제출 하였습니다' : '제출하기'}
              </Button>
            </Flex>
          </form>
        </Flex>
      </div>
    </Flex>
  );
}

export default MyChallengeDetail;
