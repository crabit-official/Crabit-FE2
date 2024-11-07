import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import { clearAuthCookies } from '@/shared/apis/set-auth-cookie';
import type { ICommonResponse } from '@/shared/types/auth';

export async function GET() {
  const data: ICommonResponse = await fetchData('/api/v1/auth/logout', 'GET');
  clearAuthCookies();

  return NextResponse.json(data);
}
