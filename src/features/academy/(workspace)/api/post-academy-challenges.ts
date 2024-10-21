import { getServerSession } from 'next-auth';

import type { IAcademyChallenges, IAcademyResponse } from '@/shared/types/acadmy';
import { authOptions } from '@/shared/utils/authOptions';

const createChallenges = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}/challenges`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IAcademyResponse<IAcademyChallenges> = await res.json();
  return data.result;
};

export default createChallenges;
