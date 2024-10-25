import type { Session } from 'next-auth';

import type { IChallengeParticipateResult, IChallengeResult, IDetailChallengeResult, IStudentChallengeResult } from '@/shared/types/acadmy';

interface IGetChallengeList {
  academyId: number;
  cursor: number;
  releasedChallengeId?: number;
  session: Session;
  take: number;
}

interface IGetChallengeDetails {
  academyId: number;
  releasedChallengeId: number;
  session: Session;
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

// 원장/강사가 배포한 챌린지 상세 조회
export async function getTeacherChallengeDetail({ session, releasedChallengeId, academyId }: IGetChallengeDetails) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/teachers/${releasedChallengeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('챌린지 상세 정보를 가져오는데 에러가 발생했습니다!');
  }

  const data: IDetailChallengeResult = await res.json();

  return data.result;
}

// 특정 챌린지에 참여하는 학생들의 진행도 관련 정보 리스트 조회
export async function getStudentsChallengeProgress({ session, releasedChallengeId, academyId, take, cursor }: IGetChallengeList) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/participants?cursor=${cursor}&take=${take}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('챌린지 상세 정보를 가져오는데 에러가 발생했습니다!');
  }

  const data: IChallengeParticipateResult = await res.json();

  return data;
}
