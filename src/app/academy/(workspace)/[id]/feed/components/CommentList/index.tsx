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
    <Flex column="start" className="gap-4">
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
      {isPending && <Comment.Skeleton />}
      {isFetching
        ? Array(5)
            .fill('')
            .map((_, i) => <Comment.Skeleton key={i} />)
        : null}
      <div ref={ref} className="h-3" />
    </Flex>
  );
}

export default CommentList;
