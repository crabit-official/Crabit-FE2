import React from 'react';
import { FaFile } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import Toggle from '@/app/academy/(workspace)/[id]/dashboard/components/Toggle';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import BoxContainer from '@/shared/components/BoxContainer';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TChallengeDetail } from '@/shared/types/market';

type TChallengeContentProps = TChallengeDetail['result'] & {
  setRelease: (status: boolean) => void;
};

function ChallengeContent({ challenge, teacher, academy, setRelease }: TChallengeContentProps) {
  return (
    <>
      <Flex column="center" className="w-full gap-1">
        <Flex row="start" className="items-center gap-2">
          <Typography size="h5" className="break-keep text-main-deep-pink">
            {getChallengeType(challenge?.challengeType)} • {getChallengeCategory(challenge?.challengeCategory)}
          </Typography>
          {teacher && academy && (
            <Typography size="h5" as="p" className="py-2 text-xs opacity-60">
              {academy?.academyName} • {teacher?.nickname}/{teacher?.name}
            </Typography>
          )}
        </Flex>
        <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
          {challenge?.title}
        </Typography>
      </Flex>
      <Flex column="center" className="w-full gap-4">
        {challenge?.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge.thumbnailImageUrl}`}
            alt="thumbnail img"
            width={400}
            height={400}
            className="size-full h-64 rounded-2xl border border-solid border-gray-100 object-contain shadow-custom"
          />
        ) : (
          <Image src="/images/test.jpeg" alt="default thumbnail img" width={300} height={300} className="h-96 w-full rounded-2xl object-cover" />
        )}
        <BoxContainer variant="border" className="px-4 py-5">
          <Typography size="h3">챌린지 설명</Typography>
          <Typography size="h5" className="w-full overflow-hidden whitespace-normal break-all text-start font-normal opacity-80" as="p">
            {challenge?.content}
          </Typography>
          {challenge?.description && (
            <>
              <hr className="my-4 h-1 w-full" />
              <Typography size="h5" as="p" className="text-sm">
                챌린지 추가 설명
              </Typography>
              <Typography size="h5" className="w-full overflow-hidden whitespace-normal break-all text-start font-normal opacity-80" as="p">
                {challenge.description}
              </Typography>
            </>
          )}
        </BoxContainer>
        <BoxContainer className="px-4 py-5">
          <Toggle
            content={
              challenge?.fileUrl ? (
                <Flex row="start">
                  <FaFile className="mr-2" />
                  <Link target="_blank" href={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge?.fileUrl}`} download className="text-blue-500 underline">
                    {challenge?.fileUrl.split('_').slice(1).join('_')}
                  </Link>
                </Flex>
              ) : (
                '첨부파일이 없습니다.'
              )
            }
            title="첨부파일"
          />
        </BoxContainer>
      </Flex>
      <Button onClick={() => setRelease(true)} className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
        {challenge?.alreadyReleasedInAcademy ? '이미 학원에 배포된 챌린지입니다.' : '우리 학원에 배포'}
      </Button>
    </>
  );
}
export default ChallengeContent;
