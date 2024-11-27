import { cookies } from 'next/headers';

import ChallengeDetail from '@/app/academy/(workspace)/[id]/feed/components/ChallengeDetail';
import type { TChallengeDetailResult } from '@/shared/types/acadmy';

interface IFeedDetailProps {
  params: {
    feedId: string;
    id: string;
  };
  searchParams: {
    log: string;
  };
}

export default async function FeedDetailPage({ params, searchParams }: IFeedDetailProps) {
  const cookieStore = cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}/challenges/${Number(params.feedId)}/logs/${Number(searchParams.log)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
      },
    },
  );

  const challengeData = (await res.json()) as TChallengeDetailResult;

  console.log(challengeData);

  if (!res.ok) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <ChallengeDetail studentAcademyProfile={challengeData?.result.studentAcademyProfile} studentChallengeLog={challengeData?.result.studentChallengeLog} />
  );
}
