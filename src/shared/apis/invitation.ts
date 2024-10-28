import { revalidateTag } from 'next/cache';
import type { Session } from 'next-auth';

import type { IInvitationResult } from '@/shared/types/invitation';

export async function getInvitationCode({ academyId, session, academyRole }: { academyId: number; academyRole: 'INSTRUCTOR' | 'STUDENT'; session: Session }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/join/code?academyRole=${academyRole}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    next: { tags: ['invitation'] },
  });

  if (!response.ok) {
    throw new Error('가입 코드를 조회하는데 에러가 발생했습니다.ㄴ');
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
    throw new Error('가입 코드를 생성하는데 에러가 발생했습니다.ㄴ');
  }

  const data: IInvitationResult = await response.json();
  revalidateTag('invitation');

  return data;
}
