import type { IAcademyChallenge, IAcademyChallenges, IAcademyResponse } from '@/shared/types/acadmy';

const createChallenges = async ({ id, challengeData, accessToken }: { accessToken: string; challengeData: IAcademyChallenges; id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}/challenges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(challengeData),
  });

  const data: IAcademyResponse<IAcademyChallenge> = await res.json();
  return data.result;
};

export default createChallenges;
