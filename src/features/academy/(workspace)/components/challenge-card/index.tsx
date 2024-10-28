import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import type { IChallenge } from '@/shared/types/acadmy';

function ChallengeCard({ thumbnailImageUrl, title, releasedChallengeId }: IChallenge) {
  const router = useRouter();
  return (
    <Flex
      column="start"
      className="h-[330px] w-full max-w-[360px] cursor-pointer gap-4 rounded-xl bg-white/60 shadow-transparent transition-all duration-200 hover:shadow-lg"
      onClick={() => router.push(`challenge/${releasedChallengeId}`)}
    >
      {thumbnailImageUrl ? (
        <Image
          alt="이미지 설명"
          className="h-44 w-full shrink-0 rounded-t-xl bg-[#131315] object-cover"
          width={300}
          height={300}
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${thumbnailImageUrl}`}
        />
      ) : (
        <Image alt="이미지 설명" className="h-44 w-full shrink-0 rounded-t-xl bg-[#131315] object-cover" width={100} height={100} src="/images/logo_dark.png" />
      )}
      <Flex column="start" className="relative size-full gap-4 px-4 py-1">
        <Flex row="start" className="gap-2">
          <StateLabel label="공개 챌린지" className="w-20 text-center" variant="red" />
          <StateLabel label="공부 챌린지" className="w-20 text-center" />
        </Flex>
        <Flex column="start" className="gap-1">
          <Typography size="h5" className="font-bold">
            {title}
          </Typography>
          <Typography size="h5" className="text-xs">
            현재 진행률 : 95%
          </Typography>
        </Flex>
        <Flex className="absolute bottom-4 right-4">
          <Typography size="h5" className="text-xs text-neutral-400">
            DAY 3 | Ⓟ 100
          </Typography>
        </Flex>
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
