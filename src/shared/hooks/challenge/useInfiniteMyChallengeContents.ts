import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';

import { getMyChallengeContents } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IStudentChallengeContentsResults } from '@/shared/types/acadmy';

function useInfiniteMyChallengeContents(
  academyId: number,
  studentChallengeId: number,
  queryOptions?: UseInfiniteQueryOptions<
    IStudentChallengeContentsResults,
    DefaultError,
    InfiniteData<IStudentChallengeContentsResults, number>,
    IStudentChallengeContentsResults,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMyChallengeContents({ cursor: pageParam, take: 10, academyId, studentChallengeId }),
    queryKey: [queryKeys.MY_CHALLENGE_CONTENTS, { academyId }, { studentChallengeId }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}
export default useInfiniteMyChallengeContents;
