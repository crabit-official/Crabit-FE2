// [원장 선생님] 학원 전체 강사 리스트 조회

import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IAcademyInstructorListResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const nickname = req.nextUrl.searchParams.get('nickname') || '';

  console.log(cursor, take, academyId, nickname);

  let url = `/api/v1/academies/${academyId}/instructors?cursor=${cursor}&take=${take}`;

  if (nickname) {
    url += `&nickname=${nickname}`;
  }

  try {
    const data = await fetchData<IAcademyInstructorListResult>(url, 'GET');
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
