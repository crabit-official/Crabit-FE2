import React from 'react';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';

interface IChallengeCardProps {
  // releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

function ChallengeCard({ thumbnailImageUrl, title }: IChallengeCardProps) {
  return (
    <Flex
      column="between"
      className="w-full cursor-pointer gap-4 rounded-lg bg-white p-4 shadow-transparent transition-all duration-200 hover:shadow-lg md:w-3/5"
    >
      {thumbnailImageUrl && (
        <Image
          alt="이미지 설명"
          className="h-44 w-full shrink-0 rounded-lg bg-[#131315] object-contain"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${thumbnailImageUrl}`}
        />
      )}
      <Flex column="start" className="w-full gap-4 py-1">
        <Typography size="h5" className="text-sm">
          {title}
        </Typography>
      </Flex>
    </Flex>
  );
}

function ChallengeCardSkeleton() {
  return (
    <Flex column="between" className="w-full animate-opacity gap-4 rounded-lg bg-gray-300 px-3 py-4 md:w-3/5">
      <Skeleton height={100} className="w-full rounded-lg" />
      <Skeleton height={65} className="rounded-lg" />
    </Flex>
  );
}

ChallengeCard.Skeleton = ChallengeCardSkeleton;

export default ChallengeCard;
