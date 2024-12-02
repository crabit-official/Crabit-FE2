'use client';

import React from 'react';

import { STUDENT_STATISTICS } from '@/shared/constants/student-statistics';
import type { IStudentChallengeStatistics } from '@/shared/types/acadmy';

interface IChallengeProps {
  challengeData?: IStudentChallengeStatistics;
}

function ChallengeStatisticsTable({ challengeData }: IChallengeProps) {
  return (
    <div className="w-full max-w-[800px] rounded-lg border border-solid border-gray-200 bg-white/60 md:w-11/12">
      <table className="w-full text-sm md:text-base">
        <thead className="bg-gray-50 font-bold">
          <tr>
            <th scope="col" className="p-4">
              챌린지 진행 상태
            </th>
            <th scope="col" className="p-4">
              개수
            </th>
          </tr>
        </thead>
        <tbody>
          {challengeData ? (
            Object.entries(challengeData).map(([key, count]) => (
              <tr className="border-t border-solid border-gray-200" key={key}>
                <td className="p-4 text-center">{STUDENT_STATISTICS[key as keyof IStudentChallengeStatistics]}</td>
                <td className="p-4 text-center">{count} 개</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-4 text-center text-gray-500">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ChallengeStatisticsTable;
