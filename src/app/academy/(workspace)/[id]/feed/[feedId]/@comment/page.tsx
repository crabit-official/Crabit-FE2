import CommentForm from '@/app/academy/(workspace)/[id]/feed/components/CommentForm';
import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

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
      <Flex column="start" className="mt-10 w-full gap-2">
        <Flex row="start" className="w-full items-center gap-2">
          <Avatar />
          <Typography size="h7" as="p" className="font-normal opacity-80">
            <strong className="font-semibold">안예원</strong> • 2024.11.12
          </Typography>
        </Flex>
        <Typography size="h7" className="ml-5 w-fit rounded-xl bg-main-deep-pink/20 px-4 py-2 font-normal">
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
          댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf 댓글dsfdf
        </Typography>
      </Flex>
    </Flex>
  );
}
