import ModalDetail from '@/app/academy/(workspace)/[id]/market/components/ModalDetail';
import { fetchData } from '@/shared/apis/fetch-data';
import type { TChallengeDetail } from '@/shared/types/market';

interface IMarketChallengeModalProps {
  params: {
    challengeId: string;
    id: string;
  };
}

async function MarketChallengeModalPage({ params }: IMarketChallengeModalProps) {
  const challengeData = await fetchData<TChallengeDetail>(`/api/v1/academies/${Number(params.id)}/market/${Number(params.challengeId)}`, 'GET');

  return <ModalDetail {...challengeData.result} />;
}
export default MarketChallengeModalPage;
