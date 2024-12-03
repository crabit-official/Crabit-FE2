import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { verifyCode } from '@/shared/apis/email';

function useVerifyCode() {
  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      toast.success('인증되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useVerifyCode;
