import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TAcademyStudentDetailResponse } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const academyMemberId = req.nextUrl.searchParams.get('academyMemberId') || '';

  try {
    const res = await fetchData<TAcademyStudentDetailResponse>(`/api/v1/academies/${academyId}/students/${academyMemberId}/details`, 'GET');

    return NextResponse.json(res);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ isSuccess: false, message: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
