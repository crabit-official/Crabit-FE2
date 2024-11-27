import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IAcademyResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';

  const data = await fetchData<IAcademyResult>(`/api/v1/members?cursor=${cursor}&take=${take}`, 'GET');

  return NextResponse.json(data);
}
