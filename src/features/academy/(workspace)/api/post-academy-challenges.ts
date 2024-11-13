import type { IAcademyChallenge, IAcademyChallenges, IAcademyResponse } from '@/shared/types/acadmy';

const createChallenges = async ({ academyId, challengeData }: { academyId: number; challengeData: IAcademyChallenges }) => {
  const res = await fetch(`/api/challenge/create?academyId=${academyId}`, {
    method: 'POST',
    body: JSON.stringify({ ...challengeData }),
  });

  const data: IAcademyResponse<IAcademyChallenge> = await res.json();

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export default createChallenges;
