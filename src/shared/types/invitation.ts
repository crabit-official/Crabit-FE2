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
