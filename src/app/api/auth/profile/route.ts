import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IAuthResponse } from '@/shared/types/auth';

export async function GET() {
  try {
    const data: IAuthResponse = await fetchData('/api/v1/member/profile', 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
