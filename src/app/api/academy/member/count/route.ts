import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TAcademyMemberResponse } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const academyRole = req.nextUrl.searchParams.get('academyRole') || '';

  const url = `/api/v1/academies/${academyId}/academy-member-count?academyRole=${academyRole}`;

  try {
    const data = await fetchData<TAcademyMemberResponse>(url, 'GET');
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
