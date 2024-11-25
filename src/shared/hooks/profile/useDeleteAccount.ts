import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteAccount } from '@/shared/apis/profile';

function useDeleteAccount() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      router.replace('/');
      toast.success('계정이 삭제되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useDeleteAccount;
