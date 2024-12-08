import { useQuery } from '@tanstack/react-query';

import { getAcademyMemberCount } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';
import type { TAcademyMemberRequest } from '@/shared/types/acadmy';

function useGetAcademyMember({ academyId, academyRole }: TAcademyMemberRequest) {
  return useQuery({
    queryFn: () => getAcademyMemberCount({ academyId, academyRole }),
    queryKey: [queryKeys.ACADEMY_COUNT, academyRole, academyId],
  });
}
export default useGetAcademyMember;
