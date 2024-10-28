import React from 'react';

import type { ITop5Students } from '@/shared/types/acadmy';

interface IBestStudentTableContentProps {
  rank: number;
  student: ITop5Students;
}

function BestStudentTableContent({ rank, student }: IBestStudentTableContentProps) {
  return (
    <tr className="border-t border-solid border-gray-200">
      <td className="p-4 text-center">{rank}</td>
      <td className="p-4 text-center" colSpan={2}>
        {student?.nickname}
      </td>
      <td className="break-keep p-4 text-center">{student?.school ?? '??'}</td>

      <td className="p-4 text-center" colSpan={2}>
        {student.approvedChallengeCount} 개
      </td>
      <td className="p-4 text-center" colSpan={2}>
        Ⓟ {student?.points}
      </td>
    </tr>
  );
}

export default BestStudentTableContent;
