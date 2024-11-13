'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

import ChallengeCard from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeCard';
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
        page.result.challengeList.length !== 0
          ? page.result.challengeList.map((challenge) => (
              <ChallengeCard {...challenge} key={challenge.challengeCoreId} onClick={() => router.push(`market/${challenge.challengeCoreId}`)} />
            ))
          : null,
      )}
      <div ref={ref} className="h-14" />
    </div>
  );
}

export default ChallengeCardList;
