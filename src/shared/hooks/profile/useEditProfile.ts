import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editProfile } from '@/shared/apis/profile';
import { queryKeys } from '@/shared/constants/query-keys';

function useEditProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      toast.success('프로필을 성공적으로 변경하였습니다.');
      queryClient.invalidateQueries({ queryKey: [queryKeys.PROFILE] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useEditProfile;
