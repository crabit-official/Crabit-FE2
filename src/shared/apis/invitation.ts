import { revalidateTag } from 'next/cache';
import type { Session } from 'next-auth';

import type { IInvitationResult, IJoinInvitation, IJoinInvitationResponse } from '@/shared/types/invitation';

export async function getInvitationCode({ academyId, session, academyRole }: { academyId: number; academyRole: 'INSTRUCTOR' | 'STUDENT'; session: Session }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/join/code?academyRole=${academyRole}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    next: { tags: ['invitation'] },
  });

  if (!response.ok) {
    throw new Error('가입 코드를 조회하는데 에러가 발생했습니다.');
  }

  const data: IInvitationResult = await response.json();

  return data;
}

export async function postInvitationCode({ academyId, session, academyRole }: { academyId: number; academyRole: 'INSTRUCTOR' | 'STUDENT'; session: Session }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/join/code?academyRole=${academyRole}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('가입 코드를 생성하는데 에러가 발생했습니다.');
  }

  const data: IInvitationResult = await response.json();
  revalidateTag('invitation');

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
