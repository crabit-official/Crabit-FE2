import React from 'react';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/market/components/ChallengeDetail';
import { fetchData } from '@/shared/apis/fetch-data';
import type { TChallengeDetail } from '@/shared/types/market';

interface IMarketChallengeProps {
  params: {
    challengeId: string;
    id: string;
  };
}

async function MarketChallengeDetailPage({ params }: IMarketChallengeProps) {
  const challengeData = await fetchData<TChallengeDetail>(`/api/v1/academies/${Number(params.id)}/market/${Number(params.challengeId)}`, 'GET');

  return <ChallengeDetail {...challengeData.result} />;
}
export default MarketChallengeDetailPage;
