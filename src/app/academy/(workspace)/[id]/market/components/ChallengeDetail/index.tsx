import React from 'react';
import Image from 'next/image';

import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TChallengeDetail } from '@/shared/types/market';

function ChallengeDetail({ challenge }: TChallengeDetail['result']) {
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-6 py-20 md:w-3/5 md:px-0">
      <Flex column="center" className="w-full gap-1">
        <Typography size="h5" className="break-keep text-main-deep-pink">
          {getChallengeType(challenge?.challengeType)} • {getChallengeCategory(challenge?.challengeCategory)}
        </Typography>
        <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
          {challenge?.title}
        </Typography>
      </Flex>
      <Flex column="center" className="gap-4">
        {challenge?.thumbnailImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge.thumbnailImageUrl}`}
            alt="thumbnail img"
            width={400}
            height={400}
            className="h-96 w-full rounded-2xl object-cover"
          />
        ) : (
          <Image src="/images/test.jpeg" alt="default thumbnail img" width={300} height={300} className="h-96 w-full rounded-2xl object-cover" />
        )}
        <Typography size="h5" as="p" className="text-sm opacity-80">
          첨부파일 : {challenge?.fileUrl ? '첨부파일 내용' : '첨부파일이 존재하지 않습니다.'}
        </Typography>
        <Typography size="h5" as="p" className="break-keep text-base opacity-60">
          {challenge?.content}
        </Typography>
      </Flex>

      <Button className="mt-4 bg-main-deep-pink font-medium text-white" disabled={challenge?.alreadyReleasedInAcademy}>
        {challenge?.alreadyReleasedInAcademy ? '이미 학원에 배포된 챌린지입니다.' : '우리 학원에 배포'}
      </Button>
    </Flex>
  );
}

export default ChallengeDetail;
