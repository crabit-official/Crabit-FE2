import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import Image from 'next/image';

import AllChallengeContents from '@/app/academy/(workspace)/[id]/dashboard/components/AllChallengeContents';
import Menubar from '@/app/academy/(workspace)/[id]/dashboard/components/Menubar';
import { getTeachersChallengeList } from '@/shared/apis/challenge';
import { fetchData } from '@/shared/apis/fetch-data';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';

interface IAcademyDashBoardProps {
  params: {
    id: string;
  };
}

async function AcademyDashBoardPage({ params }: IAcademyDashBoardProps) {
  let contents;
  const res = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_LIST],
    queryFn: () => getTeachersChallengeList({ cursor: 0, take: 6, academyId: Number(params.id) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  // await queryClientStudent.prefetchInfiniteQuery({
  //   queryKey: [queryKeys.STUDENT_CHALLENGE_LIST],
  //   queryFn: () => useGetInfiniteStudentChallengeList({ cursor: 0, take: 6, academyId: Number(params.id) }),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
  //   pages: 1,
  // });
  // const dehydratedStudentState = dehydrate(queryClientStudent);

  if (res.result.academyRole === ACADEMY_ROLE.STUDENT) {
    contents = (
      <div>준비중</div>
      // <HydrationBoundary state={dehydratedStudentState}>
      //   <StudentAllChallengeContents academyId={Number(params.id)} />
      // </HydrationBoundary>
    );
  } else {
    contents = (
      <HydrationBoundary state={dehydratedState}>
        <AllChallengeContents academyId={Number(params.id)} />
      </HydrationBoundary>
    );
  }

  return (
    <Flex rowColumn="center" className="gap-2">
      <Flex row="start" className="relative h-40 w-full max-w-[1100px] px-6 md:h-60 md:px-0">
        <Flex column="center" className="w-full gap-1">
          <Typography size="h5" className="text-main-deep-pink">
            매일의 작은 성취를 통한 습관 형성
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            크래빗 수학학원 챌린지
          </Typography>
        </Flex>
        <Image src="/images/logo_goal.webp" alt="img" width={400} height={400} className="absolute right-0 top-0 hidden opacity-40 lg:block" />
      </Flex>
      <div className="flex flex-col gap-20 lg:grid lg:grid-cols-[180px,1fr] lg:gap-10 xl:gap-32">
        <Menubar />
        {contents}
      </div>
    </Flex>
  );
}

export default AcademyDashBoardPage;
