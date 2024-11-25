import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postSendVerifyCode } from '@/shared/apis/auth';
import type { UseMutationCustomOptions } from '@/shared/types/common';

function usePostSendVerifyCode(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSendVerifyCode,
    onSuccess: () => {
      toast.success('입력해주신 이메일로, 인증 코드를 발송했습니다.');
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
    ...mutationOptions,
  });
}

export default usePostSendVerifyCode;
