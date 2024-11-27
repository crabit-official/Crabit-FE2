import type { CommonResponse } from '@/shared/apis/dto/response';
import type { COMMENT_STATUS } from '@/shared/enums/comment';
import type { IStudentProfileDTO } from '@/shared/types/acadmy';

export type TCommentResponse = CommonResponse<{
  commentList: ICommentList[];
  hasNext: boolean;
  nextCursor: number;
}>;

export interface ICommentList extends IComment {
  commentCommentList: IComment[];
}

export interface IComment {
  academyMember: IStudentProfileDTO;
  comment: ICommentDetail;
}

export interface ICommentDetail {
  commentId: number;
  commentStatus: COMMENT_STATUS;
  content: string;
  createdAt: Date;
}