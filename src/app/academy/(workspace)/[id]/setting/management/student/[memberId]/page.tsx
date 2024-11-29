'use client';

import MemberDetail from '@/app/academy/(workspace)/[id]/setting/management/student/components/MemberDetail';

interface IMemberDetailProps {
  params: {
    id: string;
    memberId: string;
  };
}

function MemberDetailPage({ params }: IMemberDetailProps) {
  return <MemberDetail academyId={Number(params.id)} academyMemberId={Number(params.memberId)} />;
}
export default MemberDetailPage;
