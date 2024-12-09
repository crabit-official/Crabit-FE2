import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import AllChallengeContents from '@/app/academy/(workspace)/[id]/dashboard/components/AllChallengeContents';
import { getMyAcademyChallengeList } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';

interface IDashboardProps {
  academyId: number;
  category: string;
  search: string;
}

async function PrincipalDashBoardUIl({ academyId, category, search }: IDashboardProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getMyAcademyChallengeList({ cursor: 0, take: 6, academyId, releasedBy: 'ALL' }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AllChallengeContents academyId={academyId} category={category} search={search} />
    </HydrationBoundary>
  );
}
export default PrincipalDashBoardUIl;
