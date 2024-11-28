import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants/query-keys';
import type { IProfileResponse } from '@/shared/types/auth';

function useGetProfile() {
  return useQuery({
    queryKey: [queryKeys.PROFILE],
    queryFn: async () => {
      const res = await fetch('/api/auth/profile', { method: 'GET' });
      const data = (await res.json()) as IProfileResponse;

      return data.result;
    },
    retry: false,
    staleTime: Infinity,
  });
}
export default useGetProfile;
