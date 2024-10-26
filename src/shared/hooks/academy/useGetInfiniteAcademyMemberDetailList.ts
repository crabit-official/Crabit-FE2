import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getAcademyMemberDetailList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IAcademyMemberListResult } from '@/shared/types/acadmy';

function useGetInfiniteAcademyMemberDetailList(
  session: Session,
  take: number,
  academyId: number,
  nickname?: string,
  queryOptions?: UseInfiniteQueryOptions<
    IAcademyMemberListResult,
    DefaultError,
    InfiniteData<IAcademyMemberListResult, number>,
    IAcademyMemberListResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAcademyMemberDetailList({ session, cursor: pageParam, take, academyId, nickname }),
    queryKey: [queryKeys.ACADEMY_STUDENT_DETAIL_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteAcademyMemberDetailList;
