'use client';

import type { Session } from 'next-auth';

import MarketChallengeCard from '@/app/academy/(workspace)/[id]/market/components/ChallengeCard';
import useGetInfinitePublicChallenge from '@/shared/hooks/market/useGetInfinitePublicChallenge';

interface IPublicChallengeListProps {
  academyId: number;
  session: Session;
}

function PublicChallengeList({ session, academyId }: IPublicChallengeListProps) {
  const { data: publicChallengeList } = useGetInfinitePublicChallenge(session, academyId);

  return (
    <div className="grid w-full grid-cols-1 place-items-center gap-4 px-2 sm:grid-cols-2 md:grid-cols-3">
      {publicChallengeList?.pages?.map((challengeList) =>
        challengeList.result.academyPublicChallengeList.map((challenge) => <MarketChallengeCard {...challenge} key={challenge.releasedChallengeId} />),
      )}
    </div>
  );
}
export default PublicChallengeList;
