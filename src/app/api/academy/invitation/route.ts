import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IInvitationResult } from '@/shared/types/invitation';

export async function GET(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const academyRole = req.nextUrl.searchParams.get('academyRole') || '';

  try {
    const data = await fetchData<IInvitationResult>(`/api/v1/academies/${academyId}/join/code?academyRole=${academyRole}`, 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: '학원 초대코드를 받을 수 없습니다.' });
  }
}

export async function POST(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const academyRole = req.nextUrl.searchParams.get('academyRole') || '';

  try {
    const data = await fetchData<IInvitationResult>(`/api/v1/academies/${academyId}/join/code?academyRole=${academyRole}`, 'POST');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: '학원 초대코드 재발급에 실패했습니다.' });
  }
}
