import type { CommonResponse } from '@/shared/apis/dto/response';
import type { TError } from '@/shared/types/acadmy';
import type { IBlockCommentResponse, TCommentResponse } from '@/shared/types/comment';

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

  return (await res.json()) as CommonResponse<{ commentId: string }>;
}

export async function getCommentList({
  academyId,
  releasedChallengeId,
  studentChallengeLogId,
  cursor,
  take,
}: {
  academyId: number;
  cursor: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
  take: number;
}) {
  const res = await fetch(
    `/api/comment?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}&studentChallengeLogId=${studentChallengeLogId}&cursor=${cursor}&take=${take}`,
    {
      method: 'GET',
    },
  );
  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TCommentResponse;
}

export async function reportComment({
  academyId,
  releasedChallengeId,
  commentId,
  reason,
}: {
  academyId: number;
  commentId: number;
  reason: string;
  releasedChallengeId: number;
}) {
  const res = await fetch(`/api/comment/report?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}&commentId=${commentId}`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<{ commentReportId: number }>;
}

export async function blockComment({ academyId, releasedChallengeId, commentId }: { academyId: number; commentId: number; releasedChallengeId: number }) {
  const res = await fetch(`/api/comment/block?academyId=${academyId}&releasedChallengeId=${releasedChallengeId}&commentId=${commentId}`, {
    method: 'POST',
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<IBlockCommentResponse>;
}
