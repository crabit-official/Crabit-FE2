// [학생] 학원 스페이스 탈퇴

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { TGetAcademyInfoResponse, TLeaveAcademyResponse, TUpdateAcademyInfoRequest, TUpdateAcademyInfoResponse } from '@/shared/types/manage';

export async function DELETE(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';

  try {
    const res = await fetchData<TLeaveAcademyResponse>(`/api/v1/academies/${academyId}`, 'DELETE');

    return NextResponse.json(res);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ isSuccess: false, message: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}

export async function PUT(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const body = (await req.json()) as TUpdateAcademyInfoRequest;

  try {
    const res = await fetchData<TUpdateAcademyInfoResponse>(`/api/v1/academies/${academyId}`, 'PUT', {
      name: body.name,
      email: body.email,
      address: body.address,
      addressDetail: body.addressDetail,
      mainImageUrl: body.mainImageUrl,
      studentCountRange: body.studentCountRange,
      contactNumber: body.contactNumber,
    });

    return NextResponse.json(res);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ isSuccess: false, message: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}

export async function GET(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';

  try {
    const res = await fetchData<TGetAcademyInfoResponse>(`/api/v1/academies/${academyId}/details`, 'GET');

    return NextResponse.json(res);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ isSuccess: false, message: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
