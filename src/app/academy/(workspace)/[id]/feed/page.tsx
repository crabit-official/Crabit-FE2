import React from 'react';

import ChallengeFeed from '@/app/academy/(workspace)/[id]/dashboard/components/(student)/ChallengeFeed';
import Flex from '@/shared/components/Flex';

interface IFeedPageProps {
  params: {
    id: string;
  };
}

export default function ChallengeFeedPage({ params }: IFeedPageProps) {
  return (
    <Flex className="w-full py-10 sm:w-3/5">
      <ChallengeFeed academyId={Number(params.id)} />
    </Flex>
  );
}
