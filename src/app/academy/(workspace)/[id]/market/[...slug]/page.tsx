import { getServerSession, type Session } from 'next-auth';

import { getPublicChallengeDetail } from '@/shared/apis/market';
import { authOptions } from '@/shared/utils/authOptions';

interface IMarketChallengeDetailProps {
  params: {
    id: string;
    slug: string[];
  };
}

async function MarketChallengeDetail({ params }: IMarketChallengeDetailProps) {
  const session = (await getServerSession(authOptions)) as Session;

  const { id, slug: paramsArray } = params;
  const [, challengeId] = paramsArray || [];

  const challenge = await getPublicChallengeDetail({ session, academyId: Number(id), releasedChallengeId: Number(challengeId) });

  return <div>{challenge?.releaseInstructorProfile.academyNickname}</div>;
}
export default MarketChallengeDetail;
