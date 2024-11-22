import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { CommonResponse } from '@/shared/apis/dto/response';
import { fetchData } from '@/shared/apis/fetch-data';
import type { IProfileResponse } from '@/shared/types/auth';

export async function GET() {
  try {
    const data: IProfileResponse = await fetchData('/api/v1/member/profile', 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}

export async function PUT(req: NextRequest) {
  const body = (await req.json()) as Promise<{ name: string; profileImageUrl: string | null }>;

  try {
    const data = await fetchData<CommonResponse<{ memberId: number }>>('/api/v1/member/profile', 'PUT', body);
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
