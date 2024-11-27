import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { CommonResponse } from '@/shared/apis/dto/response';
import { fetchData } from '@/shared/apis/fetch-data';
import type { IBlockCommentResponse } from '@/shared/types/comment';

export async function POST(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const commentId = req.nextUrl.searchParams.get('commentId') || '';

  try {
    const data = await fetchData<CommonResponse<IBlockCommentResponse>>(
      `/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/comments/${commentId}/blocks`,
      'POST',
    );
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
