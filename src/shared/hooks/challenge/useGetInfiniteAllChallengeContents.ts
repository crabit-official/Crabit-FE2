import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getAllChallengeContents } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IAllChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteAllChallengeContents(
  session: Session,
  academyId: number,

  queryOptions?: UseInfiniteQueryOptions<IAllChallengeResult, DefaultError, InfiniteData<IAllChallengeResult, number>, IAllChallengeResult, QueryKey, number>,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAllChallengeContents({ session, cursor: pageParam, take: 5, academyId }),
    queryKey: [queryKeys.ALL_CHALLENGE_LIST, { academyId }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}
export default useGetInfiniteAllChallengeContents;
