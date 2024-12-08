'use client';

import React, { useEffect } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';

import StudentChallengeContent from '../StudentChallengeContent';

import FallbackMessage from '@/shared/components/FallbackMessage';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeContents from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeContents';

interface IStudentChallengeContents {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeId: number;
}

function StudentChallengeContents({ academyId, releasedChallengeId, studentChallengeId }: IStudentChallengeContents) {
  const { data: contents, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStudentChallengeContents(academyId, releasedChallengeId, studentChallengeId);
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
              <Flex key={content.challengeLog.studentChallengeLogId} className="w-full flex-col sm:flex-row">
                <Flex className="w-fit gap-1 py-2 opacity-60 sm:w-20">
                  <FaRegCalendarCheck size={13} />
                  <Typography size="h7" as="p" className="text-xs font-normal">
                    {content.challengeLog.day}일차
                  </Typography>
                </Flex>
                <StudentChallengeContent academyId={academyId} challengeLog={content.challengeLog} studentProfile={content.studentProfile} />
              </Flex>
            )),
          )}
          {isFetching
            ? Array(6)
                .fill('')
                .map((_, i) => (
                  <Flex key={i} className="w-full flex-col gap-2 sm:flex-row">
                    <Skeleton height={15} width={45} className="my-2 rounded-md sm:mx-3" />
                    <StudentChallengeContent.Skeleton />
                  </Flex>
                ))
            : null}
          <div ref={ref} className="h-5" />
        </Flex>
        <Flex />
      </Flex>
    </Flex>
  );
}

export default StudentChallengeContents;
