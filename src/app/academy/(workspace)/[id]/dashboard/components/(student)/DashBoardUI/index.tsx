import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import StudentAllChallengeContents from '@/app/academy/(workspace)/[id]/dashboard/components/StudentAllChallengeContents';
import { getStudentChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

interface IDashboardProps {
  academyId: number;
  category: string;
  search: string;
}

async function StudentDashBoardUI({ academyId, search, category }: IDashboardProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.STUDENT_CHALLENGE_LIST],
    queryFn: () => getStudentChallengeList({ cursor: 0, take: 6, academyId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <StudentAllChallengeContents academyId={academyId} category={category} search={search} />
    </HydrationBoundary>
  );
}

export default StudentDashBoardUI;
