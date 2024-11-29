import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import InstructorList from '@/app/academy/(workspace)/[id]/setting/components/InstructorList';
import { getAcademyInstructorList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

async function InstructorManagementPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ACADEMY_LIST],
    queryFn: () => getAcademyInstructorList({ cursor: 0, take: 6, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <InstructorList academyId={Number(params.id)} />
    </HydrationBoundary>
  );
}

export default InstructorManagementPage;
