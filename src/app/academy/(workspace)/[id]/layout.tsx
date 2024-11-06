import React from 'react';

import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';
import { ACADEMY_ROLE } from '@/shared/enums/academy';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WorkspaceTab role={ACADEMY_ROLE.PRINCIPAL} memberId={1} />
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid">
          <div className="col-span-4 place-items-center border-x lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
