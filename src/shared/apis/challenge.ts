import type { IAcademyAttendeeListResult, IChallengeResult, IGetAcademyAttendeeList, IGetChallengeList, IStudentChallengeResult } from '@/shared/types/acadmy';

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

// 학생이 참여하는 챌린지 목록 전체 조회
export async function getStudentChallengeList({ cursor, session, take, academyId }: IGetChallengeList) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/students?cursor=${cursor}&take=${take}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('챌린지 목록을 가져오는데 에러가 발생했습니다!');
  }

  const data: IStudentChallengeResult = await res.json();

  return data;
}

// [원장 선생님] 학원 스페이스에 가입 신청한 유저 리스트 조회
export async function getAcademyAttendeeList({ cursor, session, take, academyId, academyRole }: IGetAcademyAttendeeList) {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/join/list?cursor=${cursor}&take=${take}`;

  if (academyRole) {
    url += `&academyRole=${academyRole}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('챌린지 목록을 가져오는데 에러가 발생했습니다!');
  }

  const data: IAcademyAttendeeListResult = await res.json();

  return data;
}
