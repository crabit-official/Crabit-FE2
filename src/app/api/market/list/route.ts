import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TChallengeMarketResult } from '@/shared/types/market';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const challengeType = req.nextUrl.searchParams.get('challengeType') || '';

  const data = await fetchData<TChallengeMarketResult>(
    `/api/v1/academies/${academyId}/market?cursor=${cursor}&take=${take}&challengeType=${challengeType}`,
    'GET',
  );

  return NextResponse.json(data);
}
