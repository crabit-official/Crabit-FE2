import { getServerSession, type Session } from 'next-auth';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/challenge/components/ChallengeDetail';
import { getTeacherChallengeDetail } from '@/shared/apis/challenge';
import { authOptions } from '@/shared/utils/authOptions';

async function ChallengeDetailPage({
  params,
}: {
  params: {
    challengeId: string;
    id: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as Session;

  // 특정 챌린지 상세 정보
  const res = await getTeacherChallengeDetail({
    session,
    releasedChallengeId: Number(params.challengeId),
    academyId: Number(params.id),
  });

  return <ChallengeDetail challenge={res} session={session} academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />;
}

export default ChallengeDetailPage;
