import { getServerSession } from 'next-auth';

import type { IAcademyResponse } from '@/shared/types/acadmy';
import { authOptions } from '@/shared/utils/authOptions';

const getAcademyProfile = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IAcademyResponse = await res.json();
  const role = data?.result?.academyRole;

  if (!role) return null;

  return role;
};

export default getAcademyProfile;
