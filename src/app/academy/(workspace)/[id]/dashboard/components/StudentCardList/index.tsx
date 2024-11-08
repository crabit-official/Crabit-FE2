'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import StudentCard from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCard';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeProgressList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeProgressList';

interface IStudentCardListProps {
  academyId: number;
  releasedChallengeId: number;
}

function StudentCardList({ academyId, releasedChallengeId }: IStudentCardListProps) {
  const { data: students, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteStudentChallengeProgressList(academyId, releasedChallengeId);

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
        <Typography size="h5">에러 발생 !</Typography>
      </Flex>
    );
  }

  return (
    <Flex column="between" className="w-full gap-2">
      {students?.pages.map((page) =>
        page.result.challengeParticipantList.map((student) => (
          <StudentCard
            key={student.studentChallenge.studentChallengeId}
            releasedChallengeId={releasedChallengeId}
            studentChallenge={student.studentChallenge}
            studentProfile={student.studentProfile}
          />
        )),
      )}
      <div ref={ref} className="h-14" />
    </Flex>
  );
}

export default StudentCardList;
