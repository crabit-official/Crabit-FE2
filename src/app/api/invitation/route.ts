import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IJoinInvitation, IJoinInvitationResponse } from '@/shared/types/invitation';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Promise<IJoinInvitation>;

  try {
    const data = await fetchData<IJoinInvitationResponse>(`/api/v1/academies/join`, 'POST', body);

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
