import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { CommonResponse } from '@/shared/apis/dto/response';
import { fetchData } from '@/shared/apis/fetch-data';
import type { TChallengeEditRequest } from '@/shared/types/acadmy';

export async function PUT(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const body = (await req.json()) as Promise<TChallengeEditRequest>;

  try {
    const data = await fetchData<CommonResponse<{ releasedChallengeId: number }>>(
      `/api/v1/academies/${academyId}/challenges/${releasedChallengeId}`,
      'PUT',
      body,
    );
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
