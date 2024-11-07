import React from 'react';
import Image from 'next/image';

import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import type { IChallenge } from '@/shared/types/acadmy';

interface IChallengeCard extends IChallenge {
  onClick?: () => void;
}

export default function ChallengeCard({ onClick, challengeCategory, content, title, thumbnailImageUrl }: IChallengeCard) {
  return (
    <Framer
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      className="relative flex h-fit min-h-80 w-64 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg border border-solid border-gray-100 bg-white shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
    >
      <div className="absolute left-2 top-2 rounded-2xl bg-neutral-500/80 px-2 py-1 text-xs text-white">{getChallengeCategory(challengeCategory)}</div>
      {thumbnailImageUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${thumbnailImageUrl}`}
          alt="thumbnail img"
          width={480}
          height={100}
          className="h-40 w-full object-cover"
        />
      ) : (
        <Image src="/images/test.jpeg" alt="default thumbnail img" width={480} height={100} className="h-40 w-full object-cover" />
      )}

      <Flex column="start" className="size-full min-h-32 gap-2 px-6">
        <Typography size="h5" className="break-keep">
          {title}
        </Typography>
        <Typography size="h5" as="p" className="text-overflow-3 break-keep text-xs opacity-60">
          {content}
        </Typography>
      </Flex>
    </Framer>
  );
}
