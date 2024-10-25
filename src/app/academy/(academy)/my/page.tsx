import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';

import AcademyList from '@/app/academy/(academy)/my/components/academy-list';
import ListRow from '@/features/academy/alert/components/ListRow';
import Container from '@/features/main/components/Container';
import { getAcademyList } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

async function MyAcademyPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ACADEMY_LIST],
    queryFn: () => getAcademyList({ session, cursor: 0, take: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <div className="mt-5 min-h-screen max-w-2xl overflow-y-auto rounded-md md:ml-20">
          <Suspense fallback={<ListRow.Skeleton />}>
            <AcademyList session={session} />
          </Suspense>
        </div>
      </Container>
    </HydrationBoundary>
  );
}

export default MyAcademyPage;
