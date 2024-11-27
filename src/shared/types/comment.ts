import type { CommonResponse } from '@/shared/apis/dto/response';
import type { COMMENT_STATUS } from '@/shared/enums/comment';

export type TCommentResponse = CommonResponse<{
  commentList: ICommentList[];
  hasNext: boolean;
  nextCursor: number;
}>;

export interface ICommentList extends IComment {
  commentCommentList: IComment[];
}

export interface IComment {
  academyMember: { academyMemberId: number; academyProfileImageUrl: string; nickname: string };
  comment: ICommentDetail;
}

export interface ICommentDetail {
  commentId: number;
  commentStatus: COMMENT_STATUS;
  content: string;
  createdAt: Date;
}
