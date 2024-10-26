import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getAcademyInstructorList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IAcademyInstructorListResult } from '@/shared/types/acadmy';

function useGetInfiniteAcademyMemberDetailList(
  session: Session,
  take: number,
  academyId: number,
  nickname?: string,
  queryOptions?: UseInfiniteQueryOptions<
    IAcademyInstructorListResult,
    DefaultError,
    InfiniteData<IAcademyInstructorListResult, number>,
    IAcademyInstructorListResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAcademyInstructorList({ session, cursor: pageParam, take, academyId, nickname }),
    queryKey: [queryKeys.ACADEMY_INSTRUCTOR_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteAcademyMemberDetailList;
