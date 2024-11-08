import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getStudentsChallengeProgress } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IChallengeParticipateResult } from '@/shared/types/acadmy';

function useGetInfiniteStudentChallengeProgressList(
  academyId: number,
  releasedChallengeId: number,
  queryOptions?: UseInfiniteQueryOptions<
    IChallengeParticipateResult,
    DefaultError,
    InfiniteData<IChallengeParticipateResult, number>,
    IChallengeParticipateResult,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getStudentsChallengeProgress({ cursor: pageParam, take: 10, academyId, releasedChallengeId }),
    queryKey: [queryKeys.CHALLENGE_STUDENT_PROGRESS_LIST, { academyId }, { releasedChallengeId }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}
export default useGetInfiniteStudentChallengeProgressList;
