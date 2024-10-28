import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import ChallengeTab from '@/app/academy/(workspace)/[id]/market/components/ChallengeTab';
import PublicChallengeList from '@/app/academy/(workspace)/[id]/market/components/PublicChallengeLists';
import { getPublicChallenges } from '@/shared/apis/market';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

interface IMarketPageProps {
  params: { id: string };
}

async function MarketPage({ params }: IMarketPageProps) {
  const session = (await getServerSession(authOptions)) as Session;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.PUBLIC_CHALLENGE_LIST, params.id],
    queryFn: () =>
      getPublicChallenges({
        session,
        cursor: 0,
        take: 9,
        academyId: Number(params.id),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex rowColumn="center" className="w-full gap-10 py-10">
      <ChallengeTab />
      <HydrationBoundary state={dehydratedState}>
        <Flex className="w-full max-w-[1000px]">
          <PublicChallengeList session={session} academyId={Number(params.id)} />
        </Flex>
      </HydrationBoundary>
    </Flex>
  );
}
export default MarketPage;
