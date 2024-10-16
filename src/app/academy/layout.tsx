import type React from 'react';

import AcademyTab from '@/features/academy/components/academy-tab';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AcademyTab />
      {children}
    </>
  );
}

export default Layout;
