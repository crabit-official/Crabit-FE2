import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { CommonResponse } from '@/shared/apis/dto/response';
import { fetchData } from '@/shared/apis/fetch-data';
import type { IAcademyProfile, TAcademyMemberEditProfileRequest, TAcademyMemberEditProfileResponse } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';

  try {
    const data = await fetchData<CommonResponse<IAcademyProfile>>(`/api/v1/academies/${academyId}`, 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}

export async function PUT(req: NextRequest) {
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const body = (await req.json()) as TAcademyMemberEditProfileRequest;

  try {
    const data = await fetchData<CommonResponse<TAcademyMemberEditProfileResponse>>(`/api/v1/academies/${academyId}/profiles`, 'PUT', {
      nickname: body.nickname,
      introduction: body.introduction,
      school: body.school,
      profileImageUrl: body.profileImageUrl,
    });

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
