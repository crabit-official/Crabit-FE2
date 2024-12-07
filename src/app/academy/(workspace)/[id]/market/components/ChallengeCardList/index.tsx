'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import FallbackMessage from '@/shared/components/FallbackMessage';
import Typography from '@/shared/components/Typography';
import type { CHALLENGE_TYPE } from '@/shared/enums/challenge';
import useGetInfiniteMarketChallenge from '@/shared/hooks/market/useGetInfiniteMarketChallenges';

interface IChallengeCardListProps {
  academyId: number;
  challengeType: CHALLENGE_TYPE;
}

function ChallengeCardList({ academyId, challengeType }: IChallengeCardListProps) {
  const router = useRouter();
  const { data: challenges, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteMarketChallenge(academyId, challengeType);
  const isEmpty = challenges?.pages.every((page) => page.result.challengeList.length === 0);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isEmpty) {
    return (
      <FallbackMessage
        imageUrl="/images/icons/icon_cry.webp"
        title="챌린지가 없습니다"
        content="마켓에 다양한 챌린지들이 추가될 때까지 잠시만 기다려주세요 !"
      />
    );
  }

  return (
    <>
      <div className="absolute top-[550px] flex h-[800px] w-full items-center justify-center rounded-t-[100px] bg-gradient-to-b from-main-deep-pink sm:rounded-t-[130px] lg:rounded-t-[260px]" />
      <div className="s w-6/7 relative grid min-h-[800px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {challenges?.pages?.map((page) =>
          page.result.challengeList.map((challenge) => (
            <AnimateCard
              leftLabel={
                <Typography as="p" size="h7" className="text-xs" color="main-white">
                  {getChallengeCategory(challenge.challengeCategory)}
                </Typography>
              }
              imageUrl={challenge.thumbnailImageUrl}
              onClick={() => router.push(`market/${challenge.challengeCoreId}`)}
              subTitle={challenge.content}
              title={challenge.title}
              key={challenge.challengeCoreId}
            />
          )),
        )}
        {isFetching
          ? Array(8)
              .fill('')
              .map((_, i) => <AnimateCard.Skeleton key={i} />)
          : null}
        <div ref={ref} className="h-14" />
      </div>
    </>
  );
}

export default ChallengeCardList;
