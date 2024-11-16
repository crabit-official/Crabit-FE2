import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TMyChallengeProgressResult } from '@/shared/types/acadmy';

interface IChallengeProps {
  content: string;
  fileUrl: string | null;
}

export async function POST(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const studentChallengeId = req.nextUrl.searchParams.get('studentChallengeId') || '';
  const body = (await req.json()) as Promise<IChallengeProps>;

  try {
    const data = await fetchData<TMyChallengeProgressResult>(`/api/v1/academies/${academyId}/challenges/${studentChallengeId}/logs`, 'POST', body);
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
