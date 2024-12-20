import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IChallengeApprovalResults } from '@/shared/types/acadmy';

export async function PUT(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const releasedChallengeId = req.nextUrl.searchParams.get('releasedChallengeId') || '';
  const studentChallengeId = req.nextUrl.searchParams.get('studentChallengeId') || '';
  const challengeLogApprovalStatus = req.nextUrl.searchParams.get('challengeLogApprovalStatus') || '';

  try {
    const data = await fetchData<IChallengeApprovalResults>(
      `/api/v1/academies/${academyId}/challenges/${releasedChallengeId}/participants/${studentChallengeId}?challengeLogApprovalStatus=${challengeLogApprovalStatus}`,
      'PUT',
    );
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
