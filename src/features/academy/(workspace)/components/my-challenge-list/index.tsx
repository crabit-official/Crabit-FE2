'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Session } from 'next-auth';

import ChallengeCard from '@/features/academy/(workspace)/components/challenge-card';
import MyChallengeCard from '@/features/academy/(workspace)/components/my-challenge-card';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeList';

interface IMyChallengeListProps {
  academyId: number;
  session: Session;
}

function MyChallengeList({ session, academyId }: IMyChallengeListProps) {
  const { data: challenge, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteStudentChallengeList(session, academyId);

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
