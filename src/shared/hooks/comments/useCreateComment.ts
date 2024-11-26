import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postComment } from '@/shared/apis/comments';

function useCreateComment() {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      // 댓글 쿼리 무효화
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useCreateComment;
