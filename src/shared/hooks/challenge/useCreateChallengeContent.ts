import { useMutation } from '@tanstack/react-query';

import { createChallengeContent } from '@/shared/apis/challenge';

function useCreateChallengeContent() {
  return useMutation({
    mutationFn: createChallengeContent,
    onSuccess: () => {
      // TODO: 글 다시 불러오기 (fetch)
    },
  });
}

export default useCreateChallengeContent;
