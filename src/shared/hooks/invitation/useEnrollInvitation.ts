import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { enrollInvitation } from '@/shared/apis/invitation';
import { queryKeys } from '@/shared/constants/query-keys';

function useEnrollInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInvitation,
    onSuccess: () => {
      toast.success('초대 코드를 성공적으로 입력했습니다.');
      queryClient.invalidateQueries({ queryKey: [queryKeys.ACADEMY_LIST] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useEnrollInvitation;
