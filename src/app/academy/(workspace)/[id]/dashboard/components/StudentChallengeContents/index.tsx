'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import StudentChallengeContent from '../StudentChallengeContent';

import FallbackMessage from '@/shared/components/FallbackMessage';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeContents from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeContents';

interface IStudentChallengeContents {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeId: number;
}

function StudentChallengeContents({ academyId, releasedChallengeId, studentChallengeId }: IStudentChallengeContents) {
  const {
    data: contents,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useGetInfiniteStudentChallengeContents(academyId, releasedChallengeId, studentChallengeId);
  const isEmpty = contents?.pages.every((page) => page.result.challengeLogList.length === 0);

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

  if (isEmpty) {
    return (
      <FallbackMessage
        imageUrl="/images/icons/icon_cry.webp"
        title="아직 인증글을 작성하지 않았어요 !"
        content="해당 학생이 챌린지 인증글을 작성할 때까지 조금만 기다려주세요."
      />
    );
  }

  return (
    <Flex className="min-h-[600px] w-full">
      <Flex column="start" className="relative w-full gap-4 lg:w-3/5">
        <Flex rowColumn="center" className="z-10 gap-6 pt-10">
          {contents?.pages.map((page) =>
            page.result.challengeLogList.map((content) => (
              <StudentChallengeContent
                academyId={academyId}
                key={content.challengeLog.studentChallengeLogId}
                challengeLog={content.challengeLog}
                studentProfile={content.studentProfile}
              />
            )),
          )}
          <div ref={ref} className="h-14" />
        </Flex>
        <Flex />
      </Flex>
    </Flex>
  );
}

export default StudentChallengeContents;
