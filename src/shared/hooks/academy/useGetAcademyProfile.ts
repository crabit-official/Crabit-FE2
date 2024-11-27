import { useQuery } from '@tanstack/react-query';

import { getAcademyProfile } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';

function useGetAcademyProfile(academyId: number) {
  return useQuery({
    queryFn: () => getAcademyProfile(academyId),
    queryKey: [queryKeys.ACADEMY_PROFILE, { academyId }],
    staleTime: Infinity,
  });
}

export default useGetAcademyProfile;
