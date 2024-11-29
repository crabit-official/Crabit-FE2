import { useQuery } from '@tanstack/react-query';

import { getStudentDetail } from '@/shared/apis/academy';
import { queryKeys } from '@/shared/constants/query-keys';

function useGetStudentDetail({ academyId, academyMemberId }: { academyId: number; academyMemberId: number }) {
  return useQuery({
    queryFn: () => getStudentDetail({ academyId, academyMemberId }),
    queryKey: [queryKeys.STUDENT_DETAIL, { academyId, academyMemberId }],
  });
}
export default useGetStudentDetail;
