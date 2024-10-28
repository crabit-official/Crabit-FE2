'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Session } from 'next-auth';

import StudentChallengeContent from '@/app/academy/(workspace)/[id]/challenge/components/StudentChallengeContent';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteAllChallengeContents from '@/shared/hooks/challenge/useGetInfiniteAllChallengeContents';

interface IAllChallengeContentsProps {
  academyId: number;
  session: Session;
}

function AllChallengeContents({ session, academyId }: IAllChallengeContentsProps) {
  const { data: content, isFetching, hasNextPage, fetchNextPage, isError } = useGetInfiniteAllChallengeContents(session, academyId);

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
    <Flex column="center">
      {content?.pages.map((page) =>
        page.result.challengeLogList.map((challenge) => (
          <StudentChallengeContent
            key={challenge.challengeLog.studentChallengeLogId}
            challengeLog={challenge?.challengeLog}
            studentProfile={challenge?.studentProfile}
          />
        )),
      )}
      <div ref={ref} className="h-10" />
    </Flex>
  );
}

export default AllChallengeContents;
