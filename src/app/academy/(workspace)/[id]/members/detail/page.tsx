import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import StudentDetailList from '@/app/academy/(workspace)/[id]/members/detail/components/StudentDetailList';
import Container from '@/features/main/components/Container';
import { getAcademyMemberDetailList } from '@/shared/apis/challenge';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';
import { queryKeys } from '@/shared/constants/query-keys';

async function AcademyMemberDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ACADEMY_STUDENT_DETAIL_LIST],
    queryFn: () => getAcademyMemberDetailList({ cursor: 0, take: 5, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <div className="m-auto mt-10 max-w-[600px]">
          <Heading title="학생 관리" subTitle="학원에 다니고 있는 학생을 확인할 수 있어요!" />
          <Spacing direction="vertical" size={24} />
          <Suspense fallback={<div>Loading...</div>}>
            <StudentDetailList academyId={Number(params.id)} />
          </Suspense>
        </div>
      </Container>
    </HydrationBoundary>
  );
}

export default AcademyMemberDetailPage;
