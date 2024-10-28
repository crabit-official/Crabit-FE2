import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import AllChallengeContents from '@/app/academy/(workspace)/[id]/dashboard/components/AllChallengeContents';
import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import BestChallengeTable from '@/features/academy/(workspace)/components/dashboard/best-challenge-table';
import ChartView from '@/features/academy/(workspace)/components/dashboard/chart-view';
import { getTop5Students } from '@/shared/apis/academy';
import { getAllChallengeContents } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import { authOptions } from '@/shared/utils/authOptions';

async function AcademyDashBoardPage({ params }: { params: { id: string } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const data = await getAcademyProfile(Number(params.id));
  const topStudents = await getTop5Students({ session, academyId: Number(params.id) });

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ALL_CHALLENGE_LIST],
    queryFn: () => getAllChallengeContents({ session, cursor: 0, take: 5, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  if (data?.academyRole === ACADEMY_ROLE.STUDENT) {
    return (
      <HydrationBoundary state={dehydratedState}>
        <div className="grid gap-40">
          <BestChallengeTable topStudents={topStudents} />
          <AllChallengeContents session={session} academyId={Number(params.id)} />
        </div>
      </HydrationBoundary>
    );
  }

  return (
    <div className="grid gap-40">
      <ChartView session={session} academyId={Number(params.id)} />
      <BestChallengeTable topStudents={topStudents} />
    </div>
  );
}

export default AcademyDashBoardPage;
