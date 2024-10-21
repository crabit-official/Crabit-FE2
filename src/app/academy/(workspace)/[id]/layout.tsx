import React from 'react';
import { getServerSession } from 'next-auth';

import Error from '@/features/academy/(workspace)/components/error';
import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';
import type { IAcademyResponse } from '@/shared/types/acadmy';
import { authOptions } from '@/shared/utils/authOptions';

async function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const role = await getAcademyResponse(params.id);

  if (!role) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <>
      <WorkspaceTab role={role} />;
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid">
          <div className="col-span-4 border-x lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

async function getAcademyResponse(id: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IAcademyResponse = await res.json();
  const role = data?.result?.academyRole;

  if (!role) return null;

  return role;
}

export default Layout;
