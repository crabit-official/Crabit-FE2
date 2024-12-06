import React, { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeDetail';
import ChallengeStatistics from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeStatistics';
import StudentCardList from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCardList';
import { getStudentsChallengeProgress } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';

interface IChallengeDetailProps {
  academyId: number;
  releasedChallengeId: number;
  tabName: string;
}

async function PrincipalChallengeDetail({ tabName, academyId, releasedChallengeId }: IChallengeDetailProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getStudentsChallengeProgress({ cursor: 0, take: 10, academyId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex rowColumn="center" className="z-10 mt-1 w-full gap-20 py-10">
      {(tabName === 'challenge' || !tabName) && <ChallengeDetail academyId={academyId} releasedChallengeId={releasedChallengeId} />}
      {tabName === 'student' && (
        <Suspense fallback={<div>Loading...</div>}>
          <HydrationBoundary state={dehydratedState}>
            <StudentCardList academyId={academyId} releasedChallengeId={releasedChallengeId} />
          </HydrationBoundary>
        </Suspense>
      )}
      {tabName === 'statistics' && <ChallengeStatistics />}
    </Flex>
  );
}

export default PrincipalChallengeDetail;
