import { type NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/shared/apis/fetch-data';
import type {IApplyChallengeResult} from "@/shared/types/market";
import type {TPublicChallengesResult} from "@/shared/types/public";

export async function GET(req: NextRequest) {
    const cursor = req.nextUrl.searchParams.get('cursor') || '';
    const take = req.nextUrl.searchParams.get('take') || '';
    const academyId = req.nextUrl.searchParams.get('academyId') || '';
    const category = req.nextUrl.searchParams.get('category') || '';

    let url = `/api/v1/academies/${academyId}/challenges/public?cursor=${cursor}&take=${take}`
    if(category) url += `&category=${category}`;

    try {
        const data = await fetchData<TPublicChallengesResult>(url, 'GET');
        return NextResponse.json(data);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

        return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
    }
}




export async function POST(req: NextRequest) {
    const academyId = req.nextUrl.searchParams.get('academyId') || '';
    const releasedChallengeId =req.nextUrl.searchParams.get('releasedChallengeId') || '';


    try {
        const data = await fetchData<IApplyChallengeResult>(`/api/v1/academies/${academyId}/challenges/${releasedChallengeId}`, 'POST');
        return NextResponse.json(data);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '알수없는 에러가 발생했습니다.';

        return NextResponse.json({ error: errorMessage }, { status: 400, statusText: 'Error Failed' });
    }
}
