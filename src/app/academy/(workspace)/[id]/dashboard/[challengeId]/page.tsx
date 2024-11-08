import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeDetail';
import ChallengeStatistics from '@/app/academy/(workspace)/[id]/dashboard/components/ChallengeStatistics';
import DetailTab from '@/app/academy/(workspace)/[id]/dashboard/components/DetailTab';
import StudentCardList from '@/app/academy/(workspace)/[id]/dashboard/components/StudentCardList';
import { getStudentsChallengeProgress } from '@/shared/apis/challenge';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import type { TDetailChallengeResult } from '@/shared/types/acadmy';

interface IContentDetailProps {
  params: {
    challengeId: string;
    id: string;
  };
  searchParams: {
    tab: string;
  };
}

async function ContentDetail({ params, searchParams }: IContentDetailProps) {
  const challengeData = await fetchData<TDetailChallengeResult>(
    `/api/v1/academies/${Number(params.id)}/challenges/teachers/${Number(params.challengeId)}`,
    'GET',
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getStudentsChallengeProgress({ cursor: 0, take: 10, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex className="w-full">
      <Flex column="start" className="min-h-[550px] w-full lg:w-2/3">
        <DetailTab academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />
        <Flex rowColumn="center" className="z-10 mt-1 w-full gap-20 py-10">
          {(searchParams.tab === 'challenge' || !searchParams.tab) && (
            <ChallengeDetail
              academyId={Number(params.id)}
              releasedChallengeId={Number(params.challengeId)}
              releasedChallenge={challengeData?.result.releasedChallenge}
            />
          )}
          {searchParams.tab === 'student' && (
            <HydrationBoundary state={dehydratedState}>
              <StudentCardList academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />
            </HydrationBoundary>
          )}
          {searchParams.tab === 'statistics' && <ChallengeStatistics academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ContentDetail;
