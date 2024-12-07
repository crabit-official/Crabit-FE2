import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMarketList } from '@/shared/apis/market';
import { queryKeys } from '@/shared/constants/query-keys';
import type { CHALLENGE_TYPE } from '@/shared/enums/challenge';
import type { TChallengeMarketResult } from '@/shared/types/market';

function useGetInfiniteMarketChallenge(
  academyId: number,
  challengeType: CHALLENGE_TYPE,
  queryOptions?: UseInfiniteQueryOptions<
    TChallengeMarketResult,
    DefaultError,
    InfiniteData<TChallengeMarketResult, number>,
    TChallengeMarketResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMarketList({ academyId, cursor: pageParam, take: 12, challengeType }),
    queryKey: [queryKeys.CHALLENGE_MARKET, { academyId }, { challengeType }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetInfiniteMarketChallenge;
