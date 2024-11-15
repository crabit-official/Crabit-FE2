'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import AnimateCard from '@/app/academy/(workspace)/[id]/dashboard/components/AnimateCard';
import { getChallengeCategory } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { CHALLENGE_TYPE } from '@/shared/enums/challenge';
import useGetInfiniteMarketChallenge from '@/shared/hooks/market/useGetInfiniteMarketChallenges';

interface IChallengeCardListProps {
  academyId: number;
  challengeType: CHALLENGE_TYPE;
}

// TODO: 챌린지 없을때 ui
function ChallengeCardList({ academyId, challengeType }: IChallengeCardListProps) {
  const router = useRouter();
  const { data: challenges, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfiniteMarketChallenge(academyId, challengeType);

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

  if (isError) {
    return (
      <Flex>
        <Typography size="h5">에러가 발생했습니다.</Typography>
      </Flex>
    );
  }

  return (
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
            subTitle="예원이가 넣어주면 추가"
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
  );
}

export default ChallengeCardList;
