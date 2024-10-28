import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IPublicChallengeList } from '@/shared/types/market';

function MarketChallengeCard({ challengeCategory, releasedChallengeId, title, thumbnailImageUrl }: IPublicChallengeList) {
  const router = useRouter();
  return (
    <Flex
      onClick={() => router.push(`market/public/${releasedChallengeId}`)}
      column="start"
      className="h-[330px] w-full max-w-[360px] cursor-pointer gap-4 rounded-xl bg-white/60 shadow-transparent transition-all duration-200 hover:shadow-lg"
    >
      {thumbnailImageUrl ? (
        <Image
          alt="thumbnail image"
          className="h-44 w-full shrink-0 rounded-t-xl bg-[#131315] object-cover"
          width={300}
          height={300}
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${thumbnailImageUrl}`}
        />
      ) : (
        <Image
          alt="thumbnail image"
          className="h-44 w-full shrink-0 rounded-t-xl bg-[#131315] object-contain"
          width={100}
          height={100}
          src="/images/logo_dark.png"
        />
      )}
      <Flex column="start" className="gap-2 px-3">
        <Typography size="h5">{title}</Typography>
        <StateLabel label={getChallengeCategory(challengeCategory)} className="max-w-fit text-center" />
      </Flex>
    </Flex>
  );
}
export default MarketChallengeCard;
