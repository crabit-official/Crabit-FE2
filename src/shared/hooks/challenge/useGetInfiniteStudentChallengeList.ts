import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import { getStudentChallengeList } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IStudentChallengeResult } from '@/shared/types/acadmy';

function useGetInfiniteStudentChallengeList(
  session: Session,
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
    queryFn: ({ pageParam }) => getStudentChallengeList({ session, cursor: pageParam, take: 10, academyId }),
    queryKey: [queryKeys.CHALLENGE_LIST],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}
export default useGetInfiniteStudentChallengeList;
