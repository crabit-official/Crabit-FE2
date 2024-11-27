import CommentForm from '@/app/academy/(workspace)/[id]/feed/components/CommentForm';
import CommentList from '@/app/academy/(workspace)/[id]/feed/components/CommentList';
import Flex from '@/shared/components/Flex';

interface ICommentProps {
  params: {
    feedId: string;
    id: string;
  };
  searchParams: {
    log: string;
  };
}

export default function Comment({ params, searchParams }: ICommentProps) {
  return (
    <Flex column="start">
      <CommentForm academyId={Number(params.id)} releasedChallengeId={Number(params.feedId)} studentChallengeLogId={Number(searchParams.log)} />
      <CommentList academyId={Number(params.id)} releasedChallengeId={Number(params.feedId)} studentChallengeLogId={Number(searchParams.log)} />
    </Flex>
  );
}
