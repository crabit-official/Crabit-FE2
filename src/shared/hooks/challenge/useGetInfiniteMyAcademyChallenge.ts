import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyAcademyChallengeList } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';
import type { CHALLENGE_CATEGORY } from '@/shared/enums/challenge';
import type { TGetMyAcademyChallengeListResponse } from '@/shared/types/acadmy';

function useGetInfiniteMyAcademyChallenge(
  academyId: number,
  challengeCategory: CHALLENGE_CATEGORY,
  title: string,
  releasedBy: 'ALL' | 'SELF',
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    TGetMyAcademyChallengeListResponse,
    DefaultError,
    InfiniteData<TGetMyAcademyChallengeListResponse, number>,
    TGetMyAcademyChallengeListResponse,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMyAcademyChallengeList({ cursor: pageParam, take, academyId, challengeCategory, releasedBy, title }),
    queryKey: [queryKeys.CHALLENGE_LIST, { academyId }, challengeCategory, releasedBy, title],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return lastPage?.result?.hasNext ? lastPage?.result?.nextCursor : undefined;
    },
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetInfiniteMyAcademyChallenge;
