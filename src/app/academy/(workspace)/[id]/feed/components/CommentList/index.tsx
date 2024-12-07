'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Comment from '@/app/academy/(workspace)/[id]/feed/components/Comment';
import Flex from '@/shared/components/Flex';
import useGetInfiniteComments from '@/shared/hooks/comments/useGetInfiniteComments';

interface ICommentBoxProps {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}

function CommentList({ academyId, releasedChallengeId, studentChallengeLogId }: ICommentBoxProps) {
  const {
    data: commentList,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
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

  return (
    <Flex column="start" className="gap-3">
      {commentList?.pages.map((page) =>
        page.result.commentList.map((comment) => (
          <Flex column="start" className="gap-4" key={comment.comment.commentId}>
            <Comment {...comment} academyId={academyId} releasedChallengeId={releasedChallengeId} studentChallengeLogId={studentChallengeLogId} />
            <Flex column="start" className="ml-4 gap-3">
              {comment.commentCommentList.map((reply) => (
                <Comment
                  parent={false}
                  key={reply.comment.commentId}
                  {...reply}
                  academyId={academyId}
                  releasedChallengeId={releasedChallengeId}
                  studentChallengeLogId={studentChallengeLogId}
                />
              ))}
            </Flex>
          </Flex>
        )),
      )}
      {isLoading || isFetchingNextPage
        ? Array(5)
            .fill('')
            .map((_, i) => <Comment.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-3" />
    </Flex>
  );
}

export default CommentList;
