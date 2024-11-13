import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IAcademyChallenge, IAcademyChallenges, IAcademyResponse } from '@/shared/types/acadmy';

export async function POST(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const body = (await req.json()) as Promise<IAcademyChallenges>;

  try {
    const data = await fetchData<IAcademyResponse<IAcademyChallenge>>(`/api/v1/academies/${academyId}/challenges`, 'POST', body);
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
