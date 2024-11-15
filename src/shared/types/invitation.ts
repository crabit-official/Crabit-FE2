import type { ACADEMY_ROLE } from '@/shared/enums/academy';

export interface IInvitation {
  academyId: number;
  academyRole: ACADEMY_ROLE;
  joinCode: string;
}

export interface IInvitationResult {
  code: string;
  isSuccess: boolean;
  message: string;
  result: IInvitation;
}

export interface IJoinInvitation {
  academyRole: 'INSTRUCTOR' | 'STUDENT';
  introduction: string;
  joinCode: string;
  nickname: string;
  school: string;
}

export interface IJoinInvitationResult {
  academyApprovalStatus: string;
  academyId: number;
  academyMemberId: number;
  teacherApprovalStatus: string;
}

export interface IJoinInvitationResponse {
  code: string;
  isSuccess: boolean;
  message: string;
  result: IJoinInvitationResult;
}
