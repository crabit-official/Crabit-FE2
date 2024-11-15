import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import AllChallengeContents from '@/app/academy/(workspace)/[id]/dashboard/components/AllChallengeContents';
import { getTeachersChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

interface IDashboardProps {
  academyId: number;
}

async function PrincipalDashBoardUIl({ academyId }: IDashboardProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getTeachersChallengeList({ cursor: 0, take: 6, academyId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AllChallengeContents academyId={academyId} />
    </HydrationBoundary>
  );
}
export default PrincipalDashBoardUIl;
