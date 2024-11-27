import type { IInvitationResult, IJoinInvitation, IJoinInvitationResponse } from '@/shared/types/invitation';

export async function getInvitationCode({ academyId, academyRole }: { academyId: number; academyRole: 'INSTRUCTOR' | 'STUDENT' }) {
  const response = await fetch(`/api/academy/invitation?academyRole=${academyRole}&academyId=${academyId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('가입 코드를 조회하는데 에러가 발생했습니다.');
  }

  const data: IInvitationResult = await response.json();

  return data;
}

export async function postInvitationCode({ academyId, academyRole }: { academyId: number; academyRole: 'INSTRUCTOR' | 'STUDENT' }) {
  const response = await fetch(`/api/academy/invitation?academyRole=${academyRole}&academyId=${academyId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('가입 코드를 생성하는데 에러가 발생했습니다.');
  }

  const data: IInvitationResult = await response.json();

  return data;
}

export async function enrollInvitation({ joinCode, academyRole, nickname, introduction, school }: IJoinInvitation) {
  const response = await fetch(`/api/invitation`, {
    method: 'POST',
    body: JSON.stringify({ joinCode, academyRole, nickname, introduction, school }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: IJoinInvitationResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '초대 등록 중 에러가 발생했습니다.');
  }

  return data;
}
