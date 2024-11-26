import { type NextRequest, NextResponse } from 'next/server';

import type { CommonResponse } from '@/shared/apis/dto/response';
import { fetchData } from '@/shared/apis/fetch-data';

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
