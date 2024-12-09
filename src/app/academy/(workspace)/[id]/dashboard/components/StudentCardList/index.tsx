'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import StudentCard from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCard';
import FallbackMessage from '@/shared/components/FallbackMessage';
import Flex from '@/shared/components/Flex';
import useGetInfiniteStudentChallengeProgressList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeProgressList';

interface IStudentCardListProps {
  academyId: number;
  releasedChallengeId: number;
}

function StudentCardList({ academyId, releasedChallengeId }: IStudentCardListProps) {
  const { data: students, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStudentChallengeProgressList(academyId, releasedChallengeId);
  const isEmpty = students?.pages.every((page) => page.result.challengeParticipantList.length === 0);

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
        imageUrl="/images/animation/no_content.gif"
        title="아직 참여중인 학생이 없습니다"
        content="참여형 챌린지의 경우, 학생들의 참여를 기다려주세요 !"
      />
    );
  }

  return (
    <Flex column="between" className="w-full gap-2">
      {students?.pages.map((page) =>
        page.result.challengeParticipantList.map((student) => (
          <StudentCard
            academyId={academyId}
            key={student.studentChallenge.studentChallengeId}
            releasedChallengeId={releasedChallengeId}
            studentChallenge={student.studentChallenge}
            studentProfile={student.studentProfile}
          />
        )),
      )}
      <div ref={ref} className="h-2" />
      {isFetching
        ? Array(7)
            .fill('')
            .map((_, i) => <StudentCard.Skeleton key={i} />)
        : null}
    </Flex>
  );
}

export default StudentCardList;
