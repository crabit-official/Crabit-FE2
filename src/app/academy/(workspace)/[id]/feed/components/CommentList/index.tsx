'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Comment from '@/app/academy/(workspace)/[id]/feed/components/Comment';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import useGetInfiniteComments from '@/shared/hooks/comments/useGetInfiniteComments';

interface ICommentBoxProps {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}

function CommentList({ academyId, releasedChallengeId, studentChallengeLogId }: ICommentBoxProps) {
  const {
    data: commentList,
    isPending,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useGetInfiniteComments(academyId, releasedChallengeId, studentChallengeLogId);
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        void fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <Flex>
        <Typography size="h5">에러가 발생했습니다.</Typography>
      </Flex>
    );
  }
  return (
    <div>
      {commentList?.pages.map((page) => page.result.commentList.map((comment) => <Comment key={comment.comment.commentId} {...comment} />))}
      {isPending && <Comment.Skeleton />}
      {isFetching
        ? Array(5)
            .fill('')
            .map((_, i) => <Comment.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-5" />
    </div>
  );
}
export default CommentList;
