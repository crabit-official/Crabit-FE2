'use client';

import { useEffect, useState } from 'react';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IChallengeLog } from '@/shared/types/acadmy';

interface IBarChart {
  arr: IChallengeLog[];
}

function BarChart({ arr }: IBarChart) {
  const maxCount = Math.max(...arr.map((challengeLog) => challengeLog.logCount));
  const dayArr = ['월', '화', '수', '목', '금', '토', '일'];

  const [width, setWidth] = useState<number[]>(Array(arr.length).fill(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(arr.map((day) => (day.logCount / maxCount) * 100));
    }, 0);

    return () => clearTimeout(timer);
  }, [arr, maxCount]);

  return (
    <Flex column="center" className="w-full gap-1">
      {arr.map((day, index) => (
        <Flex row="start" key={index} className="items-center gap-4">
          <Typography size="h5" as="p" className="w-[10px] text-sm font-bold text-gray-600">
            {dayArr[index]}
          </Typography>
          <div className="h-6 bg-main-pink transition-all duration-700 ease-out" style={{ width: `${width[index]}%` }} />
        </Flex>
      ))}
    </Flex>
  );
}

export default BarChart;
