import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getTeachersChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteTeacherChallengeList(
  session: Session,
  academyId: number,
  queryOptions?: UseInfiniteQueryOptions<IChallengeResult, DefaultError, InfiniteData<IChallengeResult, number>, IChallengeResult, QueryKey, number>,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getTeachersChallengeList({ session, cursor: pageParam, take: 10, academyId }),
    queryKey: [queryKeys.CHALLENGE_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteTeacherChallengeList;
