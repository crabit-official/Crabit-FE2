import React from 'react';
import Image from 'next/image';

import DetailTab from '@/app/academy/(workspace)/[id]/dashboard/components/DetailTab';
import ChallengeCardList from '@/app/academy/(workspace)/[id]/market/components/ChallengeCardList';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { MARKET_TAB_MENU } from '@/shared/constants/tab-menu';
import { CHALLENGE_TYPE } from '@/shared/enums/challenge';

interface IMarketPageProps {
  params: {
    id: number;
  };
  searchParams: {
    tab: string;
  };
}

function MarketPage({ params, searchParams }: IMarketPageProps) {
  return (
    <Flex rowColumn="center" className="w-full gap-10 py-10">
      <Flex row="start" className="z-10 h-40 w-full gap-4 px-6 md:px-0">
        <Image src="/images/logo_goal.webp" alt="img" width={100} height={100} className="hidden object-contain sm:block" />
        <Flex column="center" className="w-full gap-1">
          <Typography size="h5" className="break-keep text-main-deep-pink">
            생성된 챌린지를 손쉽게 탐색하고 활용
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            챌린지 마켓
          </Typography>
        </Flex>
      </Flex>
      <DetailTab academyId={Number(params.id)} type="market" menu={MARKET_TAB_MENU} />
      <div className="absolute top-[550px] flex h-[800px] w-full items-center justify-center rounded-t-[100px] bg-gradient-to-b from-main-deep-pink sm:rounded-t-[130px] lg:rounded-t-[260px]" />
      <Flex rowColumn="center" className="w-full">
        {(searchParams.tab === 'crabit' || !searchParams.tab) && <ChallengeCardList academyId={Number(params.id)} challengeType={CHALLENGE_TYPE.CRABIT} />}
        {searchParams.tab === 'academy' && <ChallengeCardList academyId={Number(params.id)} challengeType={CHALLENGE_TYPE.ACADEMY} />}
      </Flex>
    </Flex>
  );
}
export default MarketPage;
