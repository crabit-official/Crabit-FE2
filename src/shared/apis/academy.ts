import type { Session } from 'next-auth';

import type {
  TGetAcademyInfoRequest,
  TGetAcademyInfoResponse,
  TLeaveAcademyRequest,
  TLeaveAcademyResponse,
  TRevokeInstructorRequest,
  TRevokeInstructorResponse,
  TRevokeStudentResponse,
  TUpdateAcademyInfoRequest,
  TUpdateAcademyInfoResponse,
  TUpdateInstructorIntroductionRequest,
  TUpdateInstructorIntroductionResponse,
  TUpdateStudentIntroductionRequest,
  TUpdateStudentIntroductionResponse,
} from '../types/manage';

import type { CommonResponse } from '@/shared/apis/dto/response';
import type {
  IAcademyProfile,
  IAcademyResult,
  IStatisticsResult,
  ITop5StudentsResult,
  TAcademyInstructorDetailRequest,
  TAcademyInstructorDetailResponse,
  TAcademyMemberEditProfileRequest,
  TAcademyMemberProfileRequest,
  TAcademyMemberProfileResponse,
  TAcademyStudentDetailResponse,
  TError,
} from '@/shared/types/acadmy';

interface IGetAcademyList {
  cursor: number;
  take: number;
}

export async function getAcademyList({ cursor, take }: IGetAcademyList) {
  const res = await fetch(`/api/academy/list?cursor=${cursor}&take=${take}`);

  return (await res.json()) as IAcademyResult;
}

// export async function postEnrollAcademy({
//   academyAddress,
//   academyAddressDetail,
//   academyEmail,
//   academyName,
//   contactNumber,
//   studentCount,
//   session,
// }: IAcademyCreateDTO) {
//   const data = await fetchData<IPostEnrollAcademyResponse>(
//     `/api/v1/academies`,
//     'POST',
//     {
//       academyAddress,
//       academyAddressDetail,
//       academyEmail,
//       academyName,
//       contactNumber,
//       studentCount,
//     },
//     session,
//   );
//
//   return data.result;
// }

// interface IRevokeAcademy {
//   academyId: number;
//   session: Session;
// }
//
// export async function revokeAcademy({ session, academyId }: IRevokeAcademy) {
//   const data = await fetchData<IRevokeAcademyResponse>(`/api/v1/academies/${academyId}`, 'DELETE', {}, session);
//
//   if (data.code in ERROR_MESSAGES) {
//     // eslint-disable-next-line no-alert
//     alert(ERROR_MESSAGES[data.code]);
//     throw new Error(ERROR_MESSAGES[data.code]);
//   }
//
//   return data.result;
// }

// TOP 5 학생 정보 조회
export async function getTop5Students({ academyId, session }: { academyId: number; session: Session }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/statistics/monthly-point-ranking`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: ITop5StudentsResult = await res.json();

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
}

// 학원 챌린지 정보조회
export async function getStatistics({ academyId, session }: { academyId: number; session: Session }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/statistics/challenges`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IStatisticsResult = await res.json();

  return data.result;
}

// 학원 프로필
export async function getAcademyProfile(academyId: number) {
  const res = await fetch(`/api/academy/profile?academyId=${academyId}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<IAcademyProfile>;
}

// 학원 정보 수정
export async function updateAcademyInfo({ academyId, address, addressDetail, contactNumber, academyName, mainImageUrl }: TUpdateAcademyInfoRequest) {
  const res = await fetch(`/api/manage/academy?academyId=${academyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      addressDetail,
      contactNumber,
      mainImageUrl,
      academyName,
    }),
  });

  return (await res.json()) as TUpdateAcademyInfoResponse;
}

// 학원 스페이스 탈퇴
export async function leaveAcademy({ academyId }: TLeaveAcademyRequest) {
  const res = await fetch(`/api/manage/academy?academyId=${academyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await res.json()) as TLeaveAcademyResponse;
}

// 특정 학생 닉네임, 부가 설명 수정
export async function updateStudentIntroduction({ academyId, academyMemberId, description, nickname }: TUpdateStudentIntroductionRequest) {
  const res = await fetch(`/api/manage/student/edit?academyId=${academyId}&academyMemberId=${academyMemberId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description, nickname }),
  });

  return (await res.json()) as TUpdateStudentIntroductionResponse;
}

// 학원생 탈퇴
export async function revokeStudent({ academyId, academyMemberId }: TRevokeInstructorRequest) {
  const res = await fetch(`/api/manage/student/revoke?academyId=${academyId}&academyMemberId=${academyMemberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await res.json()) as TRevokeStudentResponse;
}

// 특정 강사에 대한 부가 설명 수정
export async function updateInstructorIntroduction({ academyId, academyMemberId, description }: TUpdateInstructorIntroductionRequest) {
  const res = await fetch(`/api/manage/instructor/edit?academyId=${academyId}&academyMemberId=${academyMemberId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  return (await res.json()) as TUpdateInstructorIntroductionResponse;
}

// 강사 강퇴 기능
export async function revokeInstructor({ academyId, academyMemberId }: TRevokeInstructorRequest) {
  const res = await fetch(`/api/manage/instructor/revoke?academyId=${academyId}&academyMemberId=${academyMemberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await res.json()) as TRevokeInstructorResponse;
}

// 학원 정보 조회기능
export async function getAcademyInfo({ academyId }: TGetAcademyInfoRequest) {
  const res = await fetch(`/api/manage/academy?academyId=${academyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await res.json()) as TGetAcademyInfoResponse;
}

// 학생 관리 상세
export async function getStudentDetail({ academyId, academyMemberId }: TRevokeInstructorRequest) {
  const res = await fetch(`/api/manage/student?academyId=${academyId}&academyMemberId=${academyMemberId}`, {
    method: 'GET',
  });

  return (await res.json()) as TAcademyStudentDetailResponse;
}

// [학원 모든 멤버] 특정 학원 스페이스 유저 프로필 조회
export async function getAcademyMemberProfile({ academyId }: TAcademyMemberProfileRequest) {
  const res = await fetch(`/api/academy/profile?academyId=${academyId}`, {
    method: 'GET',
  });

  return (await res.json()) as TAcademyMemberProfileResponse;
}

// [학원 모든 멤버] 특정 학원 스페이스 유저 프로필 수정
export async function editAcademyMemberProfile({ academyId, nickname, introduction, school, profileImageUrl }: TAcademyMemberEditProfileRequest) {
  const res = await fetch(`/api/academy/profile?academyId=${academyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, introduction, school, profileImageUrl }),
  });

  return (await res.json()) as TAcademyMemberProfileResponse;
}

// [원장 선생님] 학원 특정 강사 상세 정보 조회
export async function getAcademyInstructorDetail({ academyId, academyMemberId }: TAcademyInstructorDetailRequest) {
  const res = await fetch(`/api/academy/profile/instructors?academyId=${academyId}&academyMemberId=${academyMemberId}`, {
    method: 'GET',
  });

  return (await res.json()) as TAcademyInstructorDetailResponse;
}
