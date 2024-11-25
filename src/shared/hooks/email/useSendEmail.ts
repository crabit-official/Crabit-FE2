import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { sendEmail } from '@/shared/apis/email';

function useSendEmail() {
  const router = useRouter();
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success('이메일이 발송되었습니다.');
      router.push('/profile/password?step=code');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useSendEmail;
