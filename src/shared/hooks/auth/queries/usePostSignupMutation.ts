import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postSignup } from '@/shared/apis/auth';
import type { UseMutationCustomOptions } from '@/shared/types/common';

function usePostSignupMutation(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
    ...mutationOptions,
  });
}

export default usePostSignupMutation;
