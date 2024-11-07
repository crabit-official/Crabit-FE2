import type { Session } from 'next-auth';

import type { IApplyChallengeResult, IPublicChallengeDetailResult, IPublicChallengesResult } from '@/shared/types/market';

// 학원 공개 챌린지 조회
export async function getPublicChallenges({ academyId, session, cursor, take }: { academyId: number; cursor: number; session: Session; take: number }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/public?cursor=${cursor}&take=${take}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IPublicChallengesResult = await res.json();

  return data;
}

// 학원 공개 챌린지 상세 조회
export async function getPublicChallengeDetail({
  academyId,
  session,
  releasedChallengeId,
}: {
  academyId: number;
  releasedChallengeId: number;
  session: Session;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/public/${releasedChallengeId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IPublicChallengeDetailResult = await res.json();

  return data.result;
}

// (학생) 공개 챌린지 신청
export async function applyPublicChallenge({ academyId, session, releasedChallengeId }: { academyId: number; releasedChallengeId: number; session: Session }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${academyId}/challenges/${releasedChallengeId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IApplyChallengeResult = await res.json();

  if (!data.isSuccess) {
    throw new Error(data.message);
  }
  return data.result;
}