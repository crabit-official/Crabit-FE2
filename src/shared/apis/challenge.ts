import type { Session } from 'next-auth';

import type { CHALLENGE_LOG_APPROVAL_STATUS } from '@/shared/enums/challenge';
import type {
  IAcademyInstructorListResult,
  IAcademyMemberListResult,
  IAcademyStudentListResult,
  IChallengeApprovalResults,
  IChallengeParticipateResult,
  IChallengeResult,
  IGetAcademyMemberDetailList,
  IStudentChallengeContentsResults,
  IStudentChallengeResult,
  TAllChallengeResult,
  TChallengeResult,
  TDetailChallengeResult,
  TError,
  TMyChallengeProgressResult,
} from '@/shared/types/acadmy';

interface IGetChallengeList {
  academyId: number;
  category?: string;
  cursor: number;
  releasedChallengeId?: number;
  search?: string;
  studentChallengeId?: number;
  take: number;
}

interface IGetChallengeDetails {
  academyId: number;
  releasedChallengeId: number;
  session: Session;
}

// 원장/강사가 배포한 챌린지 목록 전체 조회
export async function getTeachersChallengeList({ cursor, take, academyId, category, search }: IGetChallengeList) {
  let url = `/api/challenge/list?cursor=${cursor}&take=${take}&academyId=${academyId}`;

  if (category) {
    url += `&challengeCategory=${category}`;
  }

  if (search) {
    url += `&title=${search}`;
  }
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('챌린지를 불러오지 못했습니다.');
  }

  return (await res.json()) as IChallengeResult;
}

// 학생이 참여하는 챌린지 목록 전체 조회
export async function getStudentChallengeList({ cursor, take, academyId, category, search }: IGetChallengeList) {
  let url = `/api/challenge/student/list?cursor=${cursor}&take=${take}&academyId=${academyId}`;

  if (category) {
    url += `&challengeLogSubmissionStatus=${category}`;
  }

  if (search) {
    url += `&title=${search}`;
  }

  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('챌린지를 불러오지 못했습니다.');
  }

  return (await res.json()) as IStudentChallengeResult;
}

// [원장 선생님] 학원 전체 학생 리스트 조회
export async function getAcademyMemberDetailList({ cursor, take, academyId, nickname }: IGetAcademyMemberDetailList) {
  let url = `/api/academy/manage/admin/students?academyId=${academyId}&cursor=${cursor}&take=${take}`;

  if (nickname) {
    url += `&nickname=${nickname}`;
  }

  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('학원의 선생님 목록을 가져오는데 에러가 발생했습니다!');
  }

  const data: IAcademyMemberListResult = await res.json();

  return data;
}

// [원장 선생님] 학원 전체 강사 리스트 조회
export async function getAcademyInstructorList({ cursor, take, academyId, nickname }: IGetAcademyMemberDetailList) {
  let url = `/api/academy/manage/instructors?academyId=${academyId}&cursor=${cursor}&take=${take}`;

  if (nickname) {
    url += `&nickname=${nickname}`;
  }

  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('학원의 선생님 목록을 가져오는데 에러가 발생했습니다!');
  }

  const data: IAcademyInstructorListResult = await res.json();

  return data;
}

// [원장 선생님, 강사] 학원 전체 학생 리스트 조회
export async function getAcademyStudentList({ cursor, take, academyId, nickname }: IGetAcademyMemberDetailList) {
  let url = `/api/academy/manage/students?academyId=${academyId}&cursor=${cursor}&take=${take}`;

  if (nickname) {
    url += `&nickname=${nickname}`;
  }
  const res = await fetch(url);

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as IAcademyStudentListResult;
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

  const data: TDetailChallengeResult = await res.json();

  return data;
}

// (원장/강사) 특정 챌린지에 참여하는 학생들의 진행도 관련 정보 리스트 조회
export async function getStudentsChallengeProgress({ releasedChallengeId, academyId, take, cursor }: IGetChallengeList) {
  const res = await fetch(`/api/challenge/student/progress?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}&cursor=${cursor}&take=${take}`, {
    method: 'GET',
  });

  return (await res.json()) as IChallengeParticipateResult;
}

// (원장/강사/학생) 특정 챌린지에서 특정 학생의 챌린지 인증 게시물 조회
export async function getStudentChallengeContents({ releasedChallengeId, academyId, take, cursor, studentChallengeId }: IGetChallengeList) {
  const res = await fetch(
    `/api/challenge/student/contents?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}&studentChallengeId=${studentChallengeId}&take=${take}&cursor=${cursor}`,
  );

  return (await res.json()) as IStudentChallengeContentsResults;
}

// (학생) 학생 유저가 챌린지 인증 게시물 작성
export async function createChallengeContent({
  academyId,
  studentChallengeId,
  content,
  fileUrl,
}: {
  academyId: number;
  content: string;
  fileUrl: string | null;
  studentChallengeId: number;
}) {
  const res = await fetch(`/api/challenge/student/logs?academyId=${academyId}&studentChallengeId=${studentChallengeId}`, {
    method: 'POST',
    body: JSON.stringify({
      content,
      fileUrl,
    }),
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TMyChallengeProgressResult;
}

// (원장/강사) 챌린지 도전결과 최종 승인/반려 처리
export async function approvalStudentChallengeResult({
  academyId,
  studentChallengeId,
  releasedChallengeId,
  challengeLogApprovalStatus,
}: {
  academyId: number;
  challengeLogApprovalStatus: CHALLENGE_LOG_APPROVAL_STATUS;
  releasedChallengeId: number;
  studentChallengeId: number;
}) {
  const res = await fetch(
    `/api/challenge/student/approval?academyId=${academyId}&studentChallengeId=${studentChallengeId}&releasedChallengeId=${releasedChallengeId}&challengeLogApprovalStatus=${challengeLogApprovalStatus}`,
    {
      method: 'PUT',
    },
  );

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as IChallengeApprovalResults;
}

// 다른 친구 진행중인 챌린지 인증 게시글 조회
export async function getAllChallengeContents({ academyId, cursor, take }: { academyId: number; cursor: number; take: number }) {
  const res = await fetch(`/api/challenge/student/logs?academyId=${academyId}&cursor=${cursor}&take=${take}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TAllChallengeResult;
}

// (원장/강사) 챌린지 삭제
export async function deleteChallenge({ academyId, releasedChallengeId }: { academyId: number; releasedChallengeId: number }) {
  const res = await fetch(`/api/challenge/delete?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}`, {
    method: 'DELETE',
  });

  const data = (await res.json()) as TChallengeResult;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data;
}

export async function getMyChallengeContents({
  academyId,
  studentChallengeId,
  cursor,
  take,
}: {
  academyId: number;
  cursor: number;
  studentChallengeId: number;
  take: number;
}) {
  const res = await fetch(`/api/challenge/student/logs/my?academyId=${academyId}&studentChallengeId=${studentChallengeId}&cursor=${cursor}&take=${take}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TAllChallengeResult;
}
