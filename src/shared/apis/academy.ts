import type { Session } from 'next-auth';

import type { IAcademyResult } from '@/shared/types/acadmy';

interface IGetAcademyList {
  cursor: number;
  session: Session;
  take: number;
}

export async function getAcademyList({ session, cursor, take }: IGetAcademyList) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/member?cursor=${cursor}&take=${take}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('학원 목록을 가져오는데 에러가 발생했습니다!');
  }

  const data: IAcademyResult = await response.json();

  return data;
}
