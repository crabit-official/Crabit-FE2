import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { applyPublicChallenge } from '@/shared/apis/market';

function useApplyChallenge() {
  return useMutation({
    mutationFn: applyPublicChallenge,
    onSuccess: () => {
      toast.success('챌린지 추가 완료! 챌린지를 시작해보세요');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useApplyChallenge;
