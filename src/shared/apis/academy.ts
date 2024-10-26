import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

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

export interface IAcademyCreateDTO {
  academyAddress: string;
  academyAddressDetail: string;
  academyEmail: string;
  academyName: string;
  contactNumber: string;
  studentCount: number;
}

interface IPostEnrollAcademyResponse {
  result: {
    academyAddress: string;
    academyAddressDetail: string;
    academyEmail: string;
    academyName: string;
    contactNumber: string;
    studentCount: number;
  };
}

export async function postEnrollAcademy({ academyAddress, academyAddressDetail, academyEmail, academyName, contactNumber, studentCount }: IAcademyCreateDTO) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'members/json',
      'Authorization': `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      academyAddress,
      academyAddressDetail,
      academyEmail,
      academyName,
      contactNumber,
      studentCount,
    }),
  });

  if (!response.ok) {
    throw new Error('학원을 생성하는데 에러가 발생했습니다!');
  }

  const data: IPostEnrollAcademyResponse = await response.json();

  return data.result;
}
