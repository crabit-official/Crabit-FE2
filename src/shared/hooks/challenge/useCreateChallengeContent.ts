import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createChallengeContent } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

interface ICreateChallengeContentProps {
  academyId: number;
  studentChallengeId: number;
}

function useCreateChallengeContent({ academyId, studentChallengeId }: ICreateChallengeContentProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChallengeContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.MY_CHALLENGE_CONTENTS, { academyId }, { studentChallengeId }] });
      toast.success('인증 글이 생성되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useCreateChallengeContent;
