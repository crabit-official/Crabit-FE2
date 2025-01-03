import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getAcademyList } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IAcademyResult } from '@/shared/types/acadmy';

function useGetInfiniteAcademyList(
  queryOptions?: UseInfiniteQueryOptions<IAcademyResult, DefaultError, InfiniteData<IAcademyResult, number>, IAcademyResult, QueryKey, number>,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAcademyList({ cursor: pageParam, take: 5 }),
    queryKey: [queryKeys.ACADEMY_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetInfiniteAcademyList;
