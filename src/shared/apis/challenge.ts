import type { Session } from 'next-auth';

import type { IChallengeResult } from '@/shared/types/acadmy';

interface IGetChallengeList {
  academyId: number;
  cursor: number;
  session: Session;
  take: number;
}

// 원장/강사가 배포한 챌린지 목록 전체 조회
export async function getTeachersChallengeList({ cursor, session, take, academyId }: IGetChallengeList) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/teachers?cursor=${cursor}&take=${take}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('챌린지 목록을 가져오는데 에러가 발생했습니다!');
  }

  const data: IChallengeResult = await res.json();

  return data;
}

// export async function getStudentChallengeList({ cursor, session, take }: IGetChallengeList) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/students?cursor=${cursor}&take=${take}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${session?.accessToken}`,
//     },
//   });
//
//   if (!res.ok) {
//     throw new Error('학원 목록을 가져오는데 에러가 발생했습니다!');
//   }
//
//   const data: IAcademyResult = await res.json();
//
//   return data;
// }
