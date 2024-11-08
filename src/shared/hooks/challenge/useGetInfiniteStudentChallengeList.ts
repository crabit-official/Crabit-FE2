import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getStudentChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IStudentChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteStudentChallengeList(
  academyId: number,
  queryOptions?: UseInfiniteQueryOptions<
    IStudentChallengeResult,
    DefaultError,
    InfiniteData<IStudentChallengeResult, number>,
    IStudentChallengeResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getStudentChallengeList({ cursor: pageParam, take: 6, academyId }),
    queryKey: [queryKeys.STUDENT_CHALLENGE_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}
export default useGetInfiniteStudentChallengeList;
