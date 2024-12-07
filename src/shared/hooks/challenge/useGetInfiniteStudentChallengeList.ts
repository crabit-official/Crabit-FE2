import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getStudentChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { CHALLENGE_LOG_SUBMISSION_STATUS } from '@/shared/enums/challenge';
import type { IStudentChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteStudentChallengeList(
  academyId: number,
  category?: CHALLENGE_LOG_SUBMISSION_STATUS,
  search?: string,
  queryOptions?: UseInfiniteQueryOptions<
    IStudentChallengeResult,
    DefaultError,
    InfiniteData<IStudentChallengeResult, number>,
    IStudentChallengeResult,
    QueryKey,
    number
  >,
) {
  const categoryKey = category || 'ALL';
  const searchKey = search || 'ALL';

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getStudentChallengeList({ cursor: pageParam, take: 6, academyId, category, search }),
    queryKey: [queryKeys.STUDENT_CHALLENGE_LIST, { academyId }, categoryKey, searchKey],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    throwOnError: true,
    ...queryOptions,
  });
}
export default useGetInfiniteStudentChallengeList;
