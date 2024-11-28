// [원장 선생님] 강사 강퇴
import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TRevokeInstructorResponse } from '@/shared/types/manage';

export async function DELETE(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const academyMemberId = req.nextUrl.searchParams.get('academyMemberId') || '';

  try {
    const res = await fetchData<TRevokeInstructorResponse>(`/api/v1/academies/${academyId}/instructors/${academyMemberId}`, 'DELETE');

    return NextResponse.json(res);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ isSuccess: false, message: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
