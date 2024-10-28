import React from 'react';

import formatDate from '@/shared/utils/date';

interface IDashboardChallengeTableProps {
  approvedParticipants: number;
  releasedAt: Date;
  totalParticipants: number;
}

function DashboardChallengeTable({ releasedAt, totalParticipants, approvedParticipants }: IDashboardChallengeTableProps) {
  return (
    <table className="border-collapse border border-solid border-gray-500 bg-white/60">
      <thead className="font-bold">
        <tr>
          <th scope="col" className="break-keep border border-solid border-gray-500 bg-black/10 p-2 text-sm md:text-base">
            생성일
          </th>
          <th scope="col" className="break-keep border border-solid border-gray-500 bg-black/10 p-2 text-sm md:text-base">
            누적 참여자 수
          </th>
          <th scope="col" className="break-keep border border-solid border-gray-500 bg-black/10 p-2 text-sm md:text-base">
            완료한 참여자
          </th>
        </tr>
      </thead>
      <tbody className="border-t border-solid border-gray-600">
        <tr>
          <td className="border border-solid border-gray-500 p-2 text-center text-sm md:text-base">{formatDate(releasedAt)}</td>
          <td className="border border-solid border-gray-500 p-2 text-center text-sm md:text-base">{totalParticipants} 명</td>
          <td className="border border-solid border-gray-500 p-2 text-center text-sm md:text-base">{approvedParticipants} 명</td>
        </tr>
      </tbody>
    </table>
  );
}
export default DashboardChallengeTable;
