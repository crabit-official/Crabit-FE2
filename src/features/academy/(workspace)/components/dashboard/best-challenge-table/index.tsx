'use client';

import React from 'react';

import Typography from '@/shared/components/Typography';
import { useDraggable } from '@/shared/hooks/use-draggable';

function BestChallengeTable() {
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDraggable<HTMLDivElement>();

  return (
    <div
      className="scrollbar-hide flex w-full cursor-pointer flex-col items-center justify-center gap-6 overflow-x-auto"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUpOrLeave}
      onMouseUp={handleMouseUpOrLeave}
    >
      <Typography size="h4" className="">
        BEST CHALLENGER TOP 5
      </Typography>
      <div className="w-full min-w-[600px] max-w-[1000px] rounded-lg border border-solid border-gray-200 bg-white/60 md:w-11/12">
        <table className="w-full text-sm md:text-base">
          <thead className="font-bold">
            <tr>
              <th scope="col" className="p-4">
                순위
              </th>
              <th scope="col" className="p-4" colSpan={2}>
                이름
              </th>
              <th scope="col" className="p-4">
                반
              </th>
              <th scope="col" className="p-4" colSpan={3}>
                평균 챌린지 완료율
              </th>
              <th scope="col" className="p-4" colSpan={3}>
                완료한 챌린지
              </th>
              <th scope="col" className="p-4" colSpan={3}>
                누적 포인트
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-solid border-gray-200">
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-center" colSpan={2}>
                안예원
              </td>
              <td className="break-keep p-4 text-center">중3 월수금반</td>
              <td className="p-4 text-center" colSpan={3}>
                99%
              </td>
              <td className="p-4 text-center" colSpan={3}>
                20개
              </td>
              <td className="p-4 text-center" colSpan={3}>
                12,000
              </td>
            </tr>
            <tr className="border-t border-solid border-gray-200">
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-center" colSpan={2}>
                안예원
              </td>
              <td className="break-keep p-4 text-center">중3 월수금반</td>
              <td className="p-4 text-center" colSpan={3}>
                99%
              </td>
              <td className="p-4 text-center" colSpan={3}>
                20개
              </td>
              <td className="p-4 text-center" colSpan={3}>
                12,000
              </td>
            </tr>
            <tr className="border-t border-solid border-gray-200">
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-center" colSpan={2}>
                안예원
              </td>
              <td className="break-keep p-4 text-center">중3 월수금반</td>
              <td className="p-4 text-center" colSpan={3}>
                99%
              </td>
              <td className="p-4 text-center" colSpan={3}>
                20개
              </td>
              <td className="p-4 text-center" colSpan={3}>
                12,000
              </td>
            </tr>
            <tr className="border-t border-solid border-gray-200">
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-center" colSpan={2}>
                안예원
              </td>
              <td className="break-keep p-4 text-center">중3 월수금반</td>
              <td className="p-4 text-center" colSpan={3}>
                99%
              </td>
              <td className="p-4 text-center" colSpan={3}>
                20개
              </td>
              <td className="p-4 text-center" colSpan={3}>
                12,000
              </td>
            </tr>
            <tr className="border-t border-solid border-gray-200">
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-center" colSpan={2}>
                안예원
              </td>
              <td className="break-keep p-4 text-center">중3 월수금반</td>
              <td className="p-4 text-center" colSpan={3}>
                99%
              </td>
              <td className="p-4 text-center" colSpan={3}>
                20개
              </td>
              <td className="p-4 text-center" colSpan={3}>
                12,000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default BestChallengeTable;
