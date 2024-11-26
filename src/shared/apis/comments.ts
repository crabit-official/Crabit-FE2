import type { TAllChallengeResult, TError } from '@/shared/types/acadmy';

export async function postComment({
  academyId,
  releasedChallengeId,
  studentChallengeLogId,
  parentId,
  content,
}: {
  academyId: number;
  content: string;
  parentId: number | null;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}) {
  const res = await fetch(`/api/comment?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}&studentChallengeLogId=${studentChallengeLogId}`, {
    method: 'POST',
    body: JSON.stringify({
      content,
      parentId,
    }),
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TAllChallengeResult;
}
