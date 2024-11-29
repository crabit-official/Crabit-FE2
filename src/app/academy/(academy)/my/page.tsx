import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AnimateCard from '../../(workspace)/[id]/dashboard/components/AnimateCard';

import AcademyList from '@/app/academy/(academy)/my/components/academy-list';
import Container from '@/features/main/components/Container';
import { getAcademyList } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';

async function MyAcademyPage() {
  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    return redirect('/');
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ACADEMY_LIST],
    queryFn: () => getAcademyList({ cursor: 0, take: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <div className="mt-10 min-h-screen">
          <Suspense fallback={<AnimateCard.Skeleton />}>
            <AcademyList />
          </Suspense>
        </div>
      </Container>
    </HydrationBoundary>
  );
}

export default MyAcademyPage;
