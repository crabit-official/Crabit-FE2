import { type NextRequest, NextResponse } from 'next/server';

import type { CommonResponse } from '@/shared/apis/dto/response';
import { fetchData } from '@/shared/apis/fetch-data';
import type { IDeleteCommentResponse, TCommentResponse } from '@/shared/types/comment';

export async function POST(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const studentChallengeLogId = req.nextUrl.searchParams.get('studentChallengeLogId') || '';
  const body = (await req.json()) as Promise<{ commentId: number }>;

  try {
    const data = await fetchData<CommonResponse<{ commentId: number }>>(
      `/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/logs/${studentChallengeLogId}`,
      'POST',
      body,
    );
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const studentChallengeLogId = req.nextUrl.searchParams.get('studentChallengeLogId') || '';

  try {
    const data = await fetchData<TCommentResponse>(
      `/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/logs/${studentChallengeLogId}/comments?cursor=${cursor}&take=${take}`,
      'GET',
    );

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}

export async function DELETE(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const commentId = req.nextUrl.searchParams.get('commentId') || '';

  try {
    const data = await fetchData<IDeleteCommentResponse>(`/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/comments/${commentId}`, 'DELETE');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
