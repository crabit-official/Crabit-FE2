import React from 'react';

import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import Error from '@/features/academy/(workspace)/components/error';
import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';

async function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const data = await getAcademyProfile(params.id);

  if (!data?.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <>
      <WorkspaceTab role={data?.academyRole} memberId={data?.memberId} />
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid">
          <div className="col-span-4 place-items-center border-x lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
