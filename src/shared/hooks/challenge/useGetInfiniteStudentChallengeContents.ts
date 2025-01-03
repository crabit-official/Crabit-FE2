import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getStudentChallengeContents } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IStudentChallengeContentsResults } from '@/shared/types/acadmy';

function useGetInfiniteStudentChallengeContents(
  academyId: number,
  releasedChallengeId: number,
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
    queryFn: ({ pageParam }) => getStudentChallengeContents({ cursor: pageParam, take: 10, academyId, studentChallengeId, releasedChallengeId }),
    queryKey: [queryKeys.CHALLENGE_STUDENT_CONTENTS, academyId, releasedChallengeId, studentChallengeId],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    throwOnError: true,
    ...queryOptions,
  });
}
export default useGetInfiniteStudentChallengeContents;
