import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IChallengeLog } from '@/shared/types/acadmy';

interface IBarChart {
  arr: IChallengeLog[];
}

function BarChart({ arr }: IBarChart) {
  const maxCount = Math.max(...arr.map((challengeLog) => challengeLog.logCount));
  const dayArr = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <Flex column="center" className="w-full gap-1">
      {arr.map((day, index) => (
        <Flex row="start" key={index} className="items-center gap-4">
          <Typography size="h5" as="p" className="w-[10px] text-sm font-bold text-gray-600">
            {dayArr[index]}
          </Typography>
          <div className="h-6 bg-main-pink" style={{ width: `${(day.logCount / maxCount) * 100}%` }} />
        </Flex>
      ))}
    </Flex>
  );
}

export default BarChart;
