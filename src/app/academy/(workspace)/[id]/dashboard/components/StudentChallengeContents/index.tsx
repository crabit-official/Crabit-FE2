'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import StudentChallengeContent from '../StudentChallengeContent';

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
    <Flex className="min-h-[600px] w-full">
      <Flex column="start" className="relative w-full gap-4 lg:w-3/5">
        <Image src="/images/icons/icon_book.webp" alt="img" width={300} height={300} className="absolute right-[-50px] top-0 hidden opacity-40 md:block" />
        <Flex row="start" className="gap-5">
          <Flex column="start">
            <Typography size="h2">챌린지 현황</Typography>
          </Flex>
        </Flex>
        <Flex rowColumn="center" className="z-10 gap-6 pt-10">
          {contents?.pages.map((page) =>
            page?.result.challengeLogList.length !== 0 ? (
              page.result.challengeLogList.map((content) => (
                <StudentChallengeContent
                  key={content.challengeLog.studentChallengeLogId}
                  challengeLog={content.challengeLog}
                  studentProfile={content.studentProfile}
                />
              ))
            ) : (
              <div key={0}>학생이 글을 작성하지 않았습니다</div>
            ),
          )}
          <div ref={ref} className="h-14" />
        </Flex>
        <Flex />
      </Flex>
    </Flex>
  );
}

export default StudentChallengeContents;
