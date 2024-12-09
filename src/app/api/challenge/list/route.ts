import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TGetMyAcademyChallengeListResponse } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const challengeCategory = req.nextUrl.searchParams.get('challengeCategory') || '';
  const title = req.nextUrl.searchParams.get('title') || '';
  const challengeFilter = req.nextUrl.searchParams.get('challengeFilter') || '';

  let url = `/api/v1/academies/${academyId}/challenges?challengeFilter=${challengeFilter}&cursor=${cursor}&take=${take}`;

  if (challengeCategory) url += `&challengeCategory=${challengeCategory}`;
  if (title) url += `&title=${title}`;

  try {
    const data = await fetchData<TGetMyAcademyChallengeListResponse>(url, 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
