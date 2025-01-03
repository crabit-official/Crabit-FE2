import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { EMAIL_VERIFIED_TYPE } from '@/shared/enums/email';
import type { TEmailVerifiedResponse } from '@/shared/types/email';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Promise<{ email: string; emailVerificationPurpose: EMAIL_VERIFIED_TYPE }>;

  try {
    const data = await fetchData<TEmailVerifiedResponse>(`/api/v1/auth/emails/send`, 'POST', body);
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
