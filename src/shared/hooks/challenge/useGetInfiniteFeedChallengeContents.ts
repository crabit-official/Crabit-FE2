import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';

import { getAllChallengeContents } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { TAllChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteFeedChallengeContents(
  academyId: number,
  queryOptions?: UseInfiniteQueryOptions<TAllChallengeResult, DefaultError, InfiniteData<TAllChallengeResult, number>, TAllChallengeResult, QueryKey, number>,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAllChallengeContents({ cursor: pageParam, take: 10, academyId }),
    queryKey: [queryKeys.CHALLENGE_FEED_LIST, { academyId }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}
export default useGetInfiniteFeedChallengeContents;
