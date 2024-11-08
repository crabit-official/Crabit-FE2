import React from 'react';

import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';
import { fetchData } from '@/shared/apis/fetch-data';
import type { IAcademyProfile, IAcademyResponse } from '@/shared/types/acadmy';

interface ILayoutProps {
  children: React.ReactNode;
  params: {
    id: number;
  };
}

async function Layout({ children, params }: ILayoutProps) {
  const res = await fetchData<IAcademyResponse<IAcademyProfile>>(`/api/v1/academies/${Number(params.id)}`, 'GET');

  if (!res?.result?.academyRole) {
    return <div>학원에 접근할 수 없습니다.</div>;
  }

  return (
    <>
      <WorkspaceTab role={res?.result.academyRole} memberId={res?.result.memberId} />
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid">
          <div className="col-span-4 place-items-center border-x lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
