import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import MyChallengeList from '@/features/academy/(workspace)/components/my-challenge-list';
import { getStudentChallengeList } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

async function MyChallengePage({ params }: { params: { id: number } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getStudentChallengeList({ session, cursor: 0, take: 5, academyId: params.id }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Flex rowColumn="center" className="gap-4 px-4 pt-14">
        <Suspense fallback={<div>Loading</div>}>
          <MyChallengeList academyId={params.id} session={session} />
        </Suspense>
      </Flex>
    </HydrationBoundary>
  );
}

export default MyChallengePage;
