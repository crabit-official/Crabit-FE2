import React from 'react';

import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WorkspaceTab />
      <div>{children}</div>;
    </>
  );
}

export default Layout;
