import React from 'react';
import type { Session } from 'next-auth';

import BarChart from '@/app/academy/(workspace)/[id]/dashboard/components/BarChart';
import DashboardCard from '@/app/academy/(workspace)/[id]/dashboard/components/DashboardCard';
import DonutChart from '@/app/academy/(workspace)/[id]/dashboard/components/DonutChart';
import { getStatistics } from '@/shared/apis/academy';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IChartViewProps {
  academyId: number;
  session: Session;
}

async function ChartView({ session, academyId }: IChartViewProps) {
  const challengeData = await getStatistics({ session, academyId });

  return (
    <Flex column="center" className="gap-5 px-2 md:px-0">
      <Typography size="h4">현황 한눈에 보기</Typography>
      <div className="grid w-full grid-cols-1 place-items-center gap-4 lg:grid-cols-3">
        <Flex className="size-full max-w-[500px] gap-5 rounded-lg border border-solid border-main-pink bg-main-pink/10 p-8" rowColumn="between">
          <Typography size="h5"> 우리 학원 챌린지 평균 완료율 </Typography>
          <DonutChart approvedRate={challengeData?.academyChallengeStatistics.averageApprovedRate} color="#E36B88" size="large" />
          <Typography size="h5">지난주 챌린지 참여자 현황</Typography>
          <BarChart arr={challengeData?.weeklyChallengeLogStatistics} />
        </Flex>
        <Flex className="size-full max-w-[500px] gap-5 rounded-lg border border-solid border-sky-700 bg-sky-300/10 p-8" rowColumn="between">
          <Typography size="h5">완료율이 가장 높은 챌린지에요 😎</Typography>
          <DashboardCard {...challengeData?.highestChallengeApprovedStatistics} color="#2679ff" />
        </Flex>
        <Flex className="size-full max-w-[500px] gap-5 rounded-lg border border-solid border-neutral-500 bg-black/10 p-8" rowColumn="between">
          <Typography size="h5">완료율이 가장 낮은 챌린지에요 🧐</Typography>
          <DashboardCard {...challengeData?.lowestChallengeApprovedStatistics} color="#474747" />
        </Flex>
      </div>
    </Flex>
  );
}

export default ChartView;
