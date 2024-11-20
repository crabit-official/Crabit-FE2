import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IChallengeResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const challengeCategory = req.nextUrl.searchParams.get('challengeCategory') || '';
  const title = req.nextUrl.searchParams.get('title') || '';

  let url = `/api/v1/academies/${academyId}/challenges/teachers?cursor=${cursor}&take=${take}`;

  if (challengeCategory) url += `&challengeCategory=${challengeCategory}`;
  if (title) url += `&title=${title}`;

  const data = await fetchData<IChallengeResult>(url, 'GET');

  return NextResponse.json(data);
}
