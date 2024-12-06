import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editChallenge } from '@/shared/apis/challenge';
import type { UseMutationCustomOptions } from '@/shared/types/common';

function useEditChallenge(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editChallenge,
    onSuccess: () => {
      toast.success('챌린지 정보 수정을 성공적으로 완료했습니다.');
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
    ...mutationOptions,
  });
}
export default useEditChallenge;
