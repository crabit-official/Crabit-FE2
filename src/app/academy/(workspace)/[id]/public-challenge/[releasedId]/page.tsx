import PublicDetail from '@/app/academy/(workspace)/[id]/public-challenge/components/PublicDetail';
import { fetchData } from '@/shared/apis/fetch-data';
import type { TPublicChallengeDetailResult } from '@/shared/types/public';

interface IModalProps {
  params: {
    id: string;
    releasedId: string;
  };
}

async function PublicChallengeDetailPage({ params }: IModalProps) {
  const challengeData = await fetchData<TPublicChallengeDetailResult>(
    `/api/v1/academies/${Number(params.id)}/challenges/public/${Number(params.releasedId)}`,
    'GET',
  );

  return <PublicDetail challengeData={challengeData.result} academyId={Number(params.id)} releasedChallengeId={Number(params.releasedId)} />;
}
export default PublicChallengeDetailPage;
