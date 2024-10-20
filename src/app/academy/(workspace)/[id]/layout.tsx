import React from 'react';
import { getServerSession } from 'next-auth';

import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';
import type { IAcademyResponse } from '@/shared/types/acadmy';
import { authOptions } from '@/shared/utils/authOptions';

async function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data: IAcademyResponse = await res.json();
  const role = data?.result?.academyRole;

  if (!role) {
    // TODO: 에러 메세지 수정
    return <div>학원에 대한 권한이 없습니다.</div>;
  }

  return (
    <>
      <WorkspaceTab role={role} />
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid">
          <div className="col-span-4 border-x lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
