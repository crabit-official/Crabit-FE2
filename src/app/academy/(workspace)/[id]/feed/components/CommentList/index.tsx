'use client';

import Comment from '@/app/academy/(workspace)/[id]/feed/components/Comment';
import useGetInfiniteComments from '@/shared/hooks/comments/useGetInfiniteComments';

interface ICommentBoxProps {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}

function CommentList({ academyId, releasedChallengeId, studentChallengeLogId }: ICommentBoxProps) {
  const { data: commentList } = useGetInfiniteComments(academyId, releasedChallengeId, studentChallengeLogId);

  return <div>{commentList?.pages.map((page) => page.result.commentList.map((comment) => <Comment key={comment.comment.commentId} {...comment} />))}</div>;
}
export default CommentList;
