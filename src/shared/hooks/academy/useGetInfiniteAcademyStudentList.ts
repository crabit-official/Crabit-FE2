import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getAcademyStudentList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IAcademyStudentListResult } from '@/shared/types/acadmy';

function useGetInfiniteAcademyMemberDetailList(
  session: Session,
  take: number,
  academyId: number,
  nickname?: string,
  queryOptions?: UseInfiniteQueryOptions<
    IAcademyStudentListResult,
    DefaultError,
    InfiniteData<IAcademyStudentListResult, number>,
    IAcademyStudentListResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAcademyStudentList({ session, cursor: pageParam, take, academyId, nickname }),
    queryKey: [queryKeys.ACADEMY_STUDENT_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteAcademyMemberDetailList;
