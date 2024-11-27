import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { reportComment } from '@/shared/apis/comments';

function useReportComment() {
  return useMutation({
    mutationFn: reportComment,
    onSuccess: () => {
      toast.success('신고가 완료 되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useReportComment;
