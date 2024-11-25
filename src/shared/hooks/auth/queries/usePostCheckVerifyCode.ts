import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postCheckVerifyCode } from '@/shared/apis/auth';
import type { UseMutationCustomOptions } from '@/shared/types/common';

function usePostCheckVerifyCode(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postCheckVerifyCode,
    onSuccess: () => {
      toast.success('인증 코드가 확인되었습니다.');
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
    ...mutationOptions,
  });
}

export default usePostCheckVerifyCode;
