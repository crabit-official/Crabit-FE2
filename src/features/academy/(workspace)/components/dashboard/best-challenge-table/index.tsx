'use client';

import React from 'react';

import BestStudentTableContent from '@/app/academy/(workspace)/[id]/dashboard/components/BestStudentTableContent';
import Typography from '@/shared/components/Typography';
import { useDraggable } from '@/shared/hooks/use-draggable';
import type { ITop5StudentsResult } from '@/shared/types/acadmy';

interface IBestChallengeTableProps {
  topStudents: ITop5StudentsResult['result'];
}
function BestChallengeTable({ topStudents }: IBestChallengeTableProps) {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDraggable<HTMLDivElement>();
  return (
    <div
      className="scrollbar-hide grid w-full cursor-pointer place-items-center gap-6 overflow-x-auto"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseUp={handleMouseUpOrLeave}
    >
      <Typography size="h4" className="">
        BEST CHALLENGER TOP 5
      </Typography>
      <div className="w-full min-w-[600px] max-w-[800px] rounded-lg border border-solid border-gray-200 bg-white/60 md:w-11/12">
        <table className="w-full text-sm md:text-base">
          <thead className="font-bold">
            <tr>
              <th scope="col" className="p-4">
                순위
              </th>
              <th scope="col" className="p-4" colSpan={2}>
                닉네임
              </th>
              <th scope="col" className="p-4">
                학교
              </th>
              <th scope="col" className="p-4" colSpan={2}>
                완료한 챌린지
              </th>
              <th scope="col" className="p-4" colSpan={2}>
                누적 포인트
              </th>
            </tr>
          </thead>
          <tbody>
            {topStudents?.academyStudentPointsRankingList.map((student, index) => (
              <BestStudentTableContent key={student.academyMemberId} student={student} rank={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BestChallengeTable;
