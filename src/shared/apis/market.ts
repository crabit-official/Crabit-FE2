import type { CHALLENGE_TYPE } from '@/shared/enums/challenge';
import type { TError } from '@/shared/types/acadmy';
import type { IApplyChallengeResult, IReleaseChallengeDTO, TChallengeMarketResult, TReleasedChallengeResult } from '@/shared/types/market';

// (학생) 공개 챌린지 신청
export async function applyPublicChallenge({ academyId, releasedChallengeId }: { academyId: number; releasedChallengeId: number }) {
  const res = await fetch(`/api/challenge/public?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}`, {
    method: 'POST',
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as IApplyChallengeResult;
}

// (원장/강사) 챌린지 마켓의 챌린지 리스트 조회
export async function getMarketList({
  academyId,
  cursor,
  take,
  challengeType,
}: {
  academyId: number;
  challengeType: CHALLENGE_TYPE;
  cursor: number;
  take: number;
}) {
  const res = await fetch(`/api/market/list?academyId=${academyId}&cursor=${cursor}&take=${take}&challengeType=${challengeType}`, {
    method: 'GET',
  });

  return (await res.json()) as TChallengeMarketResult;
}

// 챌린지 마켓의 챌린지 우리학원에 배포
export async function releaseChallenge({
  academyId,
  challengeCoreId,
  challengeData,
}: {
  academyId: number;
  challengeCoreId: number;
  challengeData: IReleaseChallengeDTO;
}) {
  const res = await fetch(`/api/market/release?academyId=${academyId}&challengeCoreId=${challengeCoreId}`, {
    method: 'POST',
    body: JSON.stringify({ ...challengeData }),
  });

  return (await res.json()) as TReleasedChallengeResult;
}
