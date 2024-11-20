import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getTeachersChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { CHALLENGE_CATEGORY } from '@/shared/enums/challenge';
import type { IChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteTeacherChallengeList(
  academyId: number,
  category?: CHALLENGE_CATEGORY,
  queryOptions?: UseInfiniteQueryOptions<IChallengeResult, DefaultError, InfiniteData<IChallengeResult, number>, IChallengeResult, QueryKey, number>,
) {
  const categoryKey = category || 'ALL';

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getTeachersChallengeList({ cursor: pageParam, take: 6, academyId, category }),
    queryKey: [queryKeys.CHALLENGE_LIST, { academyId }, categoryKey],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteTeacherChallengeList;
