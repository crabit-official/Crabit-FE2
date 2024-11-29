import { cookies } from 'next/headers';

import MemberDetail from '@/app/academy/(workspace)/[id]/setting/management/student/components/MemberDetail';
import type { TAcademyStudentDetailResponse } from '@/shared/types/acadmy';

interface IMemberDetailProps {
  params: {
    id: string;
    memberId: string;
  };
}

async function MemberDetailPage({ params }: IMemberDetailProps) {
  const cookieStore = cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}/students/${Number(params.memberId)}/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
    },
  });

  const memberProfile = (await res.json()) as TAcademyStudentDetailResponse;

  return <MemberDetail member={memberProfile.result.student} academyId={Number(params.id)} academyMemberId={Number(params.memberId)} />;
}
export default MemberDetailPage;
