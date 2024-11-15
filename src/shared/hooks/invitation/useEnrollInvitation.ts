import { useMutation } from '@tanstack/react-query';

import { enrollInvitation } from '@/shared/apis/invitation';

function useEnrollInvitation() {
  return useMutation({
    mutationFn: enrollInvitation,
  });
}

export default useEnrollInvitation;
