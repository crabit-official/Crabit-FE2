'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import ChallengeCard from '@/features/academy/(workspace)/components/challenge-card';
import MyChallengeCard from '@/features/academy/(workspace)/components/my-challenge-card';
import Flex from '@/shared/components/Flex';
import useGetInfiniteStudentChallengeList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeList';

interface IMyChallengeListProps {
  academyId: number;
}

function MyChallengeList({ academyId }: IMyChallengeListProps) {
  const { data: challenge, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStudentChallengeList(academyId);

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

  return (
    <Flex column="center" className="size-full items-center gap-4 overflow-y-auto">
      {challenge?.pages.map((page) =>
        page?.result.studentChallengeList.map((list) => (
          <MyChallengeCard challenge={list.challenge} studentChallengeStatus={list.studentChallengeStatus} key={list.challenge.releasedChallengeId} />
        )),
      )}
      {isFetching ? <ChallengeCard.Skeleton /> : null}
      <div ref={ref} className="h-14" />
    </Flex>
  );
}
export default MyChallengeList;
