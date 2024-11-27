import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import CommentForm from '@/app/academy/(workspace)/[id]/feed/components/CommentForm';
import CommentList from '@/app/academy/(workspace)/[id]/feed/components/CommentList';
import { getCommentList } from '@/shared/apis/comments';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';

interface ICommentProps {
  params: {
    feedId: string;
    id: string;
  };
  searchParams: {
    log: string;
  };
}

export default async function Comment({ params, searchParams }: ICommentProps) {
  const academyId = Number(params.id);
  const releasedChallengeId = Number(params.feedId);
  const studentChallengeLogId = Number(searchParams.log);

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.COMMENT_LIST, { academyId }, { releasedChallengeId }],
    queryFn: ({ pageParam }) => getCommentList({ academyId, cursor: pageParam, take: 10, studentChallengeLogId, releasedChallengeId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.result.hasNext ? lastPage.result.nextCursor : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex column="start">
      <CommentForm academyId={academyId} releasedChallengeId={releasedChallengeId} studentChallengeLogId={studentChallengeLogId} />
      <HydrationBoundary state={dehydratedState}>
        <CommentList academyId={academyId} releasedChallengeId={releasedChallengeId} studentChallengeLogId={studentChallengeLogId} />
      </HydrationBoundary>
    </Flex>
  );
}
