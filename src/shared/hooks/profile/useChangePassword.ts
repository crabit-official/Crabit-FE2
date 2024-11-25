import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { changePassword } from '@/shared/apis/profile';

function useChangePassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
      router.replace('/profile');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useChangePassword;
