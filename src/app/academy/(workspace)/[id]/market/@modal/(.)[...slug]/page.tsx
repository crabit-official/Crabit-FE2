import { getServerSession, type Session } from 'next-auth';

import ModalDetail from '@/app/academy/(workspace)/[id]/market/components/ModalDetail';
import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import { getPublicChallengeDetail } from '@/shared/apis/market';
import type { ACADEMY_ROLE } from '@/shared/enums/academy';
import { authOptions } from '@/shared/utils/authOptions';

interface IMarketChallengeDetailProps {
  params: {
    id: string;
    slug: string[];
  };
}

async function MarketChallengeModalPage({ params }: IMarketChallengeDetailProps) {
  const session = (await getServerSession(authOptions)) as Session;
  const data = await getAcademyProfile(Number(params.id));

  const { id, slug: paramsArray } = params;
  const [slug] = paramsArray || [];
  const challengeId = slug?.match(/\d+/)?.[0] ?? '';

  const challenge = await getPublicChallengeDetail({ session, academyId: Number(id), releasedChallengeId: Number(challengeId) });

  return (
    <ModalDetail
      academyPublicChallenge={challenge?.academyPublicChallenge}
      releaseInstructorProfile={challenge?.releaseInstructorProfile}
      session={session}
      academyId={Number(id)}
      releasedChallengeId={Number(challengeId)}
      role={data?.academyRole as ACADEMY_ROLE}
    />
  );
}
export default MarketChallengeModalPage;
