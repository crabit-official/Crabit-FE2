import React from 'react';

import MenuItem from '@/app/academy/(workspace)/[id]/dashboard/components/MenuItem';
import PublicCardList from '@/app/academy/(workspace)/[id]/public-challenge/components/PublicCardList';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { PUBLIC_MENU } from '@/shared/constants/tab-menu';

interface IPublicChallengeProps {
  params: {
    id: string;
  };
  searchParams: {
    tab: string;
  };
}

function PublicChallengePage({ params, searchParams }: IPublicChallengeProps) {
  return (
    <Flex column="start" className="min-h-[800px] gap-2">
      <Flex row="start" className="h-40 w-full max-w-[1100px] px-6 md:h-60 md:px-0">
        <Flex column="center" className="w-full gap-1">
          <Typography size="h5" className="text-main-deep-pink">
            자유롭게 챌린지에 신청 & 참여
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            공개 챌린지
          </Typography>
        </Flex>
      </Flex>
      <div className="flex flex-col gap-20 lg:grid lg:grid-cols-[180px,1fr] lg:gap-10 xl:gap-32">
        <Flex column="start">
          <ul>
            <MenuItem title="카테고리" content={PUBLIC_MENU} academyId={Number(params.id)} type="public-challenge" activeTab={searchParams.tab} />
          </ul>
        </Flex>
        <PublicCardList academyId={Number(params.id)} category={searchParams.tab} />
      </div>
    </Flex>
  );
}

export default PublicChallengePage;
