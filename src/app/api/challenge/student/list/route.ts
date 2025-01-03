import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type { IStudentChallengeResult } from '@/shared/types/acadmy';

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get('cursor') || '';
  const take = req.nextUrl.searchParams.get('take') || '';
  const academyId = req.nextUrl.searchParams.get('academyId') || '';
  const challengeLogSubmissionStatus = req.nextUrl.searchParams.get('challengeLogSubmissionStatus') || '';
  const title = req.nextUrl.searchParams.get('title') || '';

  let url = `/api/v1/academies/${academyId}/challenges/students?cursor=${cursor}&take=${take}`;

  if (challengeLogSubmissionStatus) url += `&challengeLogSubmissionStatus=${challengeLogSubmissionStatus}`;
  if (title) url += `&title=${title}`;

  try {
    const data = await fetchData<IStudentChallengeResult>(url, 'GET');

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

    return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
  }
}
