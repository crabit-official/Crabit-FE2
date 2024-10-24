import { IoPieChart } from 'react-icons/io5';
import { PiChartLineBold } from 'react-icons/pi';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function ChartView() {
  return (
    <Flex column="center" className="gap-4 px-14 sm:px-20 md:px-0">
      <Typography size="h4">현황 한눈에 보기</Typography>
      <div className="grid w-full grid-cols-1 place-items-center gap-4 md:grid-cols-3">
        <Flex className="w-full gap-2 rounded-lg border border-solid border-main-pink bg-main-pink/10 p-4" rowColumn="center">
          <Typography size="h5" className="text-sm font-medium">
            우리 학원 챌린지 평균 완료율
          </Typography>
          <IoPieChart size="100" className="text-main-pink" />
          <Typography size="h5" className="text-sm font-medium">
            지난주 챌린지 참여자 전원
          </Typography>
          <PiChartLineBold size="100" className="text-neutral-300" />
        </Flex>
        <Flex className="w-full gap-2 rounded-lg border border-solid border-sky-700 bg-sky-300/10 p-4" rowColumn="center">
          <Typography size="h5" className="text-sm font-medium">
            완료율이 가장 높은 챌린지에요 😎
          </Typography>
          <IoPieChart size="100" className="text-sky-700" />
          <Typography size="h5" className="text-sm font-medium">
            지난주 챌린지 참여자 전원
          </Typography>
          <PiChartLineBold size="100" className="text-neutral-300" />
        </Flex>
        <Flex className="w-full gap-2 rounded-lg border border-solid border-neutral-500 bg-black/10 p-4" rowColumn="center">
          <Typography size="h5" className="text-sm font-medium">
            완료율이 가장 낮은 챌린지에요 🧐
          </Typography>
          <IoPieChart size="100" className="text-neutral-500" />
          <Typography size="h5" className="text-sm font-medium">
            지난주 챌린지 참여자 전원
          </Typography>
          <PiChartLineBold size="100" className="text-neutral-300" />
        </Flex>
      </div>
    </Flex>
  );
}

export default ChartView;
