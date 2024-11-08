import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IStudentChallengeContentsResults } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const studentChallengeId = req.nextUrl.searchParams.get('studentChallengeId') || '';

  const data = await fetchData<IStudentChallengeContentsResults>(
    `/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/participants/${studentChallengeId}?cursor=${cursor}&take=${take}`,
    'GET',
  );
  return NextResponse.json(data);
}
