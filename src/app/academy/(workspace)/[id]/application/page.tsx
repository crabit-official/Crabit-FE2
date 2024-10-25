import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import ApplicationList from '@/app/academy/(workspace)/[id]/application/components/ApplicationList';
import Container from '@/features/main/components/Container';
import { getAcademyAttendeeList } from '@/shared/apis/challenge';
import Heading from '@/shared/components/Heading';
import Spacing from '@/shared/components/Spacing/spacing';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

async function AcademyApplicationPage({ params }: { params: { id: string } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.ATTENDEE_LIST],
    queryFn: () => getAcademyAttendeeList({ session, cursor: 0, take: 5, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container>
        <div className="m-auto mt-10 max-w-[600px]">
          <Heading title="신청서 관리" subTitle="학원에 신청한 사람들의 리스트를 볼 수 있어요" />
          <Spacing direction="vertical" size={24} />
          <Suspense fallback={<div>Loading...</div>}>
            <ApplicationList session={session} academyId={Number(params.id)} />
          </Suspense>
        </div>
      </Container>
    </HydrationBoundary>
  );
}

export default AcademyApplicationPage;
