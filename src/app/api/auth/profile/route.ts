import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IAuthResponse } from '@/shared/types/auth';

export async function GET() {
  const data: IAuthResponse = await fetchData('/api/v1/member/profile', 'GET');

  return NextResponse.json(data);
}
