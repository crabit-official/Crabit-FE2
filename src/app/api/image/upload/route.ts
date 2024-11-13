import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IAcademyResponse } from '@/shared/types/acadmy';
import type { IPresignedUrl } from '@/shared/types/images';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Promise<{ fileName: string }>;

  try {
    const data = await fetchData<IAcademyResponse<IPresignedUrl>>('/api/v1/s3/presigned/upload', 'POST', body);
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
