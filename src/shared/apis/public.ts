import type { CHALLENGE_CATEGORY } from '@/shared/enums/challenge';
import type { TPublicChallengesResult } from '@/shared/types/public';

// 공개 챌린지 전체 조회
export async function getPublicChallengeList({
  academyId,
  cursor,
  take,
  category,
}: {
  academyId: number;
  category?: CHALLENGE_CATEGORY;
  cursor: number;
  take: number;
}) {
  let url = `/api/challenge/public?academyId=${academyId}&cursor=${cursor}&take=${take}`;

  if (category) {
    url += `&category=${category}`;
  }

  const res = await fetch(url, {
    method: 'GET',
  });

  return (await res.json()) as TPublicChallengesResult;
}
