import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TDetailChallengeResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';

  const data = await fetchData<TDetailChallengeResult>(`/api/v1/academies/${academyId}/challenges/teachers/${releasedChallengeId}`, 'GET');

  return NextResponse.json(data);
}
