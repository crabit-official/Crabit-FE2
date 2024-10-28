import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getPublicChallenges } from '@/shared/apis/market';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IPublicChallengesResult } from '@/shared/types/market';

function useGetInfinitePublicChallenge(
  session: Session,
  academyId: number,
  queryOptions?: UseInfiniteQueryOptions<
    IPublicChallengesResult,
    DefaultError,
    InfiniteData<IPublicChallengesResult, number>,
    IPublicChallengesResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPublicChallenges({ session, academyId, cursor: pageParam, take: 9 }),
    queryKey: [queryKeys.PUBLIC_CHALLENGE_LIST, academyId],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfinitePublicChallenge;
