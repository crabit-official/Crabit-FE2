import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { verifyCode } from '@/shared/apis/email';

function useVerifyCode() {
  const router = useRouter();
  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      router.push('/profile/password?step=password');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useVerifyCode;
