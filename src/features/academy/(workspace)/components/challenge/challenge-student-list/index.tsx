'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Session } from 'next-auth';

import StudentTableContent from '@/app/academy/(workspace)/[id]/challenge/components/StudentTableContent';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteStudentChallengeProgressList from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeProgressList';
import { useDraggable } from '@/shared/hooks/use-draggable';

interface IChallengeStudentListProps {
  academyId: number;
  releasedChallengeId: number;
  session: Session;
}

function ChallengeStudentList({ session, releasedChallengeId, academyId }: IChallengeStudentListProps) {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDraggable<HTMLDivElement>();
  const {
    data: studentsData,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteStudentChallengeProgressList(session, academyId, releasedChallengeId);

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

  if (studentsData)
    return (
      <div
        className="scrollbar-hide flex w-full max-w-[1000px] cursor-pointer flex-col items-center justify-center gap-6 overflow-x-auto px-2 md:px-0"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
      >
        <div
          className="scrollbar-hide w-full overflow-x-auto rounded-lg border border-solid border-gray-200 bg-white/60"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
        >
          <table className="w-full min-w-[800px] overflow-x-auto text-sm md:text-base">
            <thead className="font-bold">
              <tr>
                <th scope="col" className="p-4">
                  학생명
                </th>
                <th scope="col" className="p-4" colSpan={3}>
                  현재 진행중인 DAY
                </th>
                <th scope="col" className="p-4">
                  반
                </th>
                <th scope="col" className="p-4" colSpan={3}>
                  진행율
                </th>
                <th scope="col" className="p-4" colSpan={3}>
                  제출 상태
                </th>
                <th scope="col" className="p-4" colSpan={3}>
                  승인 상태
                </th>
                <th scope="col" className="p-4" colSpan={3}>
                  승인
                </th>
                <th scope="col" className="p-4" colSpan={3}>
                  자세히 보기
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsData?.pages?.map((page) =>
                page?.result?.challengeParticipantList?.map((student) => (
                  <StudentTableContent
                    {...student}
                    key={student.studentChallenge.studentChallengeId}
                    releasedChallengeId={releasedChallengeId}
                    academyId={academyId}
                    session={session}
                  />
                )),
              )}
              <tr ref={ref} className="h-[10px]" />
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default ChallengeStudentList;
