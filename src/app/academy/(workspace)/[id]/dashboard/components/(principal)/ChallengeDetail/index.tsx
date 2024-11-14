import React, { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeDetail';
import ChallengeStatistics from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeStatistics';
import StudentCardList from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCardList';
import { getStudentsChallengeProgress } from '@/shared/apis/challenge';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import type { TDetailChallengeResult } from '@/shared/types/acadmy';

interface IChallengeDetailProps {
  academyId: number;
  releasedChallengeId: number;
  tabName: string;
}

async function PrincipalChallengeDetail({ tabName, academyId, releasedChallengeId }: IChallengeDetailProps) {
  const challengeData = await fetchData<TDetailChallengeResult>(`/api/v1/academies/${academyId}/challenges/teachers/${releasedChallengeId}`, 'GET');
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
      {(tabName === 'challenge' || !tabName) && (
        <ChallengeDetail academyId={academyId} releasedChallengeId={releasedChallengeId} releasedChallenge={challengeData?.result.releasedChallenge} />
      )}
      {tabName === 'student' && (
        <Suspense fallback={<div>Loading...</div>}>
          <HydrationBoundary state={dehydratedState}>
            <StudentCardList academyId={academyId} releasedChallengeId={releasedChallengeId} />
          </HydrationBoundary>
        </Suspense>
      )}
      {tabName === 'statistics' && <ChallengeStatistics academyId={academyId} releasedChallengeId={releasedChallengeId} />}
    </Flex>
  );
}

export default PrincipalChallengeDetail;
