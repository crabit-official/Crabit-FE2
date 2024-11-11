import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { releaseChallenge } from '@/shared/apis/market';

function useApplyChallenge(academyId: number) {
  const router = useRouter();
  return useMutation({
    mutationFn: releaseChallenge,
    onSuccess: () => {
      toast.success('우리학원에 챌린지를 배포하였습니다!');
      router.replace(`/academy/${academyId}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useApplyChallenge;
