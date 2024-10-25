import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getAcademyAttendeeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { IAcademyAttendeeListResult } from '@/shared/types/acadmy';

function useGetInfiniteAcademyList(
  session: Session,
  take: number,
  academyId: number,
  academyRole?: ACADEMY_ROLE,
  queryOptions?: UseInfiniteQueryOptions<
    IAcademyAttendeeListResult,
    DefaultError,
    InfiniteData<IAcademyAttendeeListResult, number>,
    IAcademyAttendeeListResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAcademyAttendeeList({ session, cursor: pageParam, take, academyId, academyRole }),
    queryKey: [queryKeys.ATTENDEE_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteAcademyList;
