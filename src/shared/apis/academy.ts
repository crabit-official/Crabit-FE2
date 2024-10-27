import type { Session } from 'next-auth';

import { fetchData } from '@/shared/apis/fetch-data';
import { ERROR_MESSAGES } from '@/shared/constants/api-error-message';
import type { IAcademyCreateDTO, IAcademyResult, IPostEnrollAcademyResponse, IRevokeAcademyResponse } from '@/shared/types/acadmy';

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

export async function postEnrollAcademy({
  academyAddress,
  academyAddressDetail,
  academyEmail,
  academyName,
  contactNumber,
  studentCount,
  session,
}: IAcademyCreateDTO) {
  const data = await fetchData<IPostEnrollAcademyResponse>(
    `/api/v1/academies`,
    'POST',
    {
      academyAddress,
      academyAddressDetail,
      academyEmail,
      academyName,
      contactNumber,
      studentCount,
    },
    session,
  );

  return data.result;
}

interface IRevokeAcademy {
  academyId: number;
  session: Session;
}

export async function revokeAcademy({ session, academyId }: IRevokeAcademy) {
  const data = await fetchData<IRevokeAcademyResponse>(`/api/v1/academies/${academyId}`, 'DELETE', {}, session);

  if (data.code in ERROR_MESSAGES) {
    // eslint-disable-next-line no-alert
    alert(ERROR_MESSAGES[data.code]);
    throw new Error(ERROR_MESSAGES[data.code]);
  }

  return data.result;
}
