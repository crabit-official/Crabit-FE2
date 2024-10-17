import React from 'react';

import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WorkspaceTab />
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid h-dvh grid-cols-5">
          <h1>Sidebar</h1>
          <div className="col-span-4 border-x lg:col-span-3">{children}</div>
          <h1>TrendBar</h1>
        </div>
      </div>
      ;
    </>
  );
}

export default Layout;
