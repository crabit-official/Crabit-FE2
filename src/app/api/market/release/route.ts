import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IReleaseChallengeDTO, TReleasedChallengeResult } from '@/shared/types/market';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Promise<IReleaseChallengeDTO>;
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const challengeCoreId = req.nextUrl.searchParams.get('challengeCoreId') || '';

  try {
    const data = await fetchData<TReleasedChallengeResult>(`/api/v1/academies/${academyId}/market/${challengeCoreId}`, 'POST', body);
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
