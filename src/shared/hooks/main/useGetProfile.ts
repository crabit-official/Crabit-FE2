import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants/query-keys';
import type { IAuthResponse } from '@/shared/types/auth';

function useGetProfile() {
  return useQuery({
    queryKey: [queryKeys.PROFILE],
    queryFn: async () => {
      const res = await fetch('/api/auth/profile', { method: 'GET' });
      const data = (await res.json()) as IAuthResponse;

      return data.result;
    },
    retry: false,
  });
}
export default useGetProfile;
