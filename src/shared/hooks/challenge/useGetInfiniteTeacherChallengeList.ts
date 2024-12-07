import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getTeachersChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { CHALLENGE_CATEGORY } from '@/shared/enums/challenge';
import type { IChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteTeacherChallengeList(
  academyId: number,
  category?: CHALLENGE_CATEGORY,
  search?: string,
  queryOptions?: UseInfiniteQueryOptions<IChallengeResult, DefaultError, InfiniteData<IChallengeResult, number>, IChallengeResult, QueryKey, number>,
) {
  const categoryKey = category || 'ALL';
  const searchKey = search || 'ALL';

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getTeachersChallengeList({ cursor: pageParam, take: 6, academyId, category, search }),
    queryKey: [queryKeys.CHALLENGE_LIST, { academyId }, categoryKey, searchKey],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetInfiniteTeacherChallengeList;
