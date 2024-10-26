'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getStatusName, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
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
  const router = useRouter();
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
        className="scrollbar-hide flex w-full cursor-pointer flex-col items-center justify-center gap-6 overflow-x-auto px-2 md:px-0"
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
                <th scope="col" className="p-4" colSpan={2}>
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
                  자세히 보기
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsData?.pages?.map((page) =>
                page?.result?.challengeParticipantList?.map((student) => (
                  <tr className="border-t border-solid border-gray-200" key={student.studentProfile.academyMemberId}>
                    <td className="p-4 text-center">{student.studentProfile.academyNickname}</td>
                    <td className="p-4 text-center" colSpan={2}>
                      <StateLabel label="DAY 4" className="m-auto w-[60px]" />
                    </td>
                    <td className="break-keep p-4 text-center">중3 월수금반</td>
                    <td className="p-4 text-center" colSpan={3}>
                      99%
                    </td>
                    <td className="p-4 text-center" colSpan={3}>
                      <StateLabel
                        label={getStatusName(student.studentChallenge.challengeLogSubmissionStatus)}
                        variant={getVariantByStatus(student.studentChallenge.challengeLogSubmissionStatus)}
                        className="m-auto w-[60px]"
                      />
                    </td>
                    <td className="p-4 text-center" colSpan={3}>
                      <Button
                        onClick={() => router.push(`${releasedChallengeId}/student/${student.studentChallenge.studentChallengeId}`)}
                        size="sm"
                        className="m-auto w-16 text-xs text-white"
                      >
                        확인하기
                      </Button>
                    </td>
                  </tr>
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
