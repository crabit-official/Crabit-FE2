import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TUpdateChallengeSettingRequest, TUpdateChallengeSettingResponse } from '@/shared/types/manage';

export async function PUT(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const body = (await req.json()) as TUpdateChallengeSettingRequest;

  try {
    const res = await fetchData<TUpdateChallengeSettingResponse>(`/api/v1/academies/${academyId}/challenges/${releasedChallengeId}`, 'PUT', {
      totalDays: body.totalDays,
      points: body.points,
      description: body.description,
      challengeParticipationMethod: body.challengeParticipationMethod,
      studentIdList: body.studentIdList,
    });

    return NextResponse.json(res);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ isSuccess: false, message: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
