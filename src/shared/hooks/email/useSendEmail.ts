import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sendEmail } from '@/shared/apis/email';

function useSendEmail() {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success('이메일이 발송되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useSendEmail;
