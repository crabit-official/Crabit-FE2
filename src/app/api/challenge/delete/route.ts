import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TChallengeResult } from '@/shared/types/acadmy';

export async function DELETE(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';

  try {
    const data = await fetchData<TChallengeResult>(`/api/v1/academies/${academyId}/challenges/${releasedChallengeId}`, 'DELETE');
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
