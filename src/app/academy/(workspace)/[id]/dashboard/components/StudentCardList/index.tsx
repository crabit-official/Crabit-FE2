'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import StudentCard from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCard';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeProgressList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeProgressList';

interface IStudentCardListProps {
  academyId: number;
  releasedChallengeId: number;
}

function StudentCardList({ academyId, releasedChallengeId }: IStudentCardListProps) {
  const { data: students, fetchNextPage, hasNextPage, isFetching, isError } = useGetInfiniteStudentChallengeProgressList(academyId, releasedChallengeId);
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

  if (isError) {
    return (
      <Flex>
        <Typography size="h5">에러 발생 !</Typography>
      </Flex>
    );
  }

  if (isEmpty) {
    return (
      <FramerScale className="flex w-full items-center justify-center gap-10 py-10">
        <Flex column="start" className="relative rounded-2xl bg-gray-200 px-5 py-4">
          <div className="absolute right-[-6px] top-1/3 size-6 rotate-45 bg-gray-200" />
          <Typography size="h4" as="p" className="break-keep text-sm font-semibold opacity-80 sm:text-base">
            아직 참여중인 학생이 없습니다.
          </Typography>
          <Typography size="h7" as="p" className="break-keep font-normal opacity-60">
            참여형 챌린지의 경우, 학생들의 참여를 기다려주세요 !
          </Typography>
        </Flex>
        <Image src="/images/icons/icon_speaker.webp" alt="speaker img" width={150} height={150} className="size-20 sm:size-40 md:size-[150px]" />
      </FramerScale>
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
        ? Array(10)
            .fill('')
            .map((_, i) => <StudentCard.Skeleton key={i} />)
        : null}
    </Flex>
  );
}

export default StudentCardList;
