import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { nonLoginPasswordChange } from '@/shared/apis/auth';

function usePasswordChange() {
  return useMutation({
    mutationFn: nonLoginPasswordChange,
    onSuccess: () => {
      toast.success('성공적으로 비밀번호가 변경되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default usePasswordChange;
