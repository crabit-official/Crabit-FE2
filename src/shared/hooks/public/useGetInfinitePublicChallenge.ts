import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import {getPublicChallengeList} from "@/shared/apis/public";
import { queryKeys } from '@/shared/constants/query-keys';
import type {CHALLENGE_CATEGORY, } from "@/shared/enums/challenge";
import type {TPublicChallengesResult} from "@/shared/types/public";


function useGetInfinitePublicChallenge(
    academyId: number,
    category?: CHALLENGE_CATEGORY,
    queryOptions?: UseInfiniteQueryOptions<
        TPublicChallengesResult,
        DefaultError,
        InfiniteData<TPublicChallengesResult, number>,
        TPublicChallengesResult,
        QueryKey,
        number
    >,
) {

  const categoryKey = category || "ALL"

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPublicChallengeList({ academyId, cursor: pageParam, take: 6 , category}),
    queryKey: [queryKeys.PUBLIC_CHALLENGE_LIST, { academyId }, categoryKey],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetInfinitePublicChallenge;
