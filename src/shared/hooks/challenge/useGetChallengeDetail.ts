import { useQuery } from '@tanstack/react-query';

import { getChallengeDetail } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

function useGetChallengeDetail(academyId: number, releasedChallengeId: number) {
  return useQuery({
    queryFn: () => getChallengeDetail({ academyId, releasedChallengeId }),
    queryKey: [queryKeys.CHALLENGE_DETAIL, academyId, releasedChallengeId],
  });
}

export default useGetChallengeDetail;
