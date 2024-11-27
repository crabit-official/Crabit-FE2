import type { Session } from 'next-auth';

import type { CommonResponse } from '@/shared/apis/dto/response';
import type { IAcademyProfile, IAcademyResult, IStatisticsResult, ITop5StudentsResult, TError } from '@/shared/types/acadmy';

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
