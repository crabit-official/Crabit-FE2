import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TAllChallengeResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const studentChallengeId = req.nextUrl.searchParams.get('studentChallengeId') || '';
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';

  try {
    const data = await fetchData<TAllChallengeResult>(
      `/api/v1/academies/${academyId}/challenges/students/${studentChallengeId}/logs?cursor=${cursor}&take=${take}`,
      'GET',
    );
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
