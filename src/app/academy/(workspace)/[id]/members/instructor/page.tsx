import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import InstructorDetailList from '@/app/academy/(workspace)/[id]/members/instructor/components/InstructorDetailList';
import Container from '@/features/main/components/Container';
import { getAcademyInstructorList } from '@/shared/apis/challenge';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';
import { queryKeys } from '@/shared/constants/query-keys';

async function AcademyInstructorDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ACADEMY_INSTRUCTOR_LIST],
    queryFn: () => getAcademyInstructorList({ cursor: 0, take: 5, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <div className="m-auto mt-10 max-w-[600px]">
          <Heading title="학원 선생님 관리" subTitle="학원서 근무하는 학원 선생님을 관리할 수 있어요!" />
          <Spacing direction="vertical" size={24} />
          <Suspense fallback={<div>Loading...</div>}>
            <InstructorDetailList academyId={Number(params.id)} />
          </Suspense>
        </div>
      </Container>
    </HydrationBoundary>
  );
}

export default AcademyInstructorDetailPage;
