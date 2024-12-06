import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TDetailChallengeResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';

  try {
    const data = await fetchData<TDetailChallengeResult>(`/api/v1/academies/${academyId}/challenges/teachers/${releasedChallengeId}`, 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
