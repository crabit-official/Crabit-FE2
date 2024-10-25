import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import ChallengeList from '@/features/academy/(workspace)/components/challenge-list';
import { getTeachersChallengeList } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

// 원장/강사 챌린지 관리 페이지
async function AcademyChallengePage({ params }: { params: { id: string } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getTeachersChallengeList({ session, cursor: 0, take: 10, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Flex rowColumn="center" className="gap-4 px-4 pt-14">
        <Suspense fallback={<div>Loading</div>}>
          <ChallengeList session={session} academyId={Number(params.id)} />
        </Suspense>
      </Flex>
    </HydrationBoundary>
  );
}

export default AcademyChallengePage;
