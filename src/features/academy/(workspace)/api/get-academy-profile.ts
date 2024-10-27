import { getServerSession } from 'next-auth';

import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';
import { authOptions } from '@/shared/utils/authOptions';

const getAcademyProfile = async (id: number) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IAcademyResponse<IAcademyProfile> = await res.json();

  if (!data) return null;

  return data.result;
};

export default getAcademyProfile;
