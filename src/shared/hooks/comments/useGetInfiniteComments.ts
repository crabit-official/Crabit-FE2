import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentList } from '@/shared/apis/comments';
import { queryKeys } from '@/shared/constants/query-keys';
import type { TCommentResponse } from '@/shared/types/comment';

function useGetInfiniteComments(
  academyId: number,
  releasedChallengeId: number,
  studentChallengeLogId: number,
  queryOptions?: UseInfiniteQueryOptions<TCommentResponse, DefaultError, InfiniteData<TCommentResponse, number>, TCommentResponse, QueryKey, number>,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getCommentList({ academyId, cursor: pageParam, take: 10, studentChallengeLogId, releasedChallengeId }),
    queryKey: [queryKeys.COMMENT_LIST, { academyId }, { releasedChallengeId }, { studentChallengeLogId }],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    ...queryOptions,
  });
}

export default useGetInfiniteComments;
