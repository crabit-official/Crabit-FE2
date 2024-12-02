import type React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="py-10">{children}</div>;
}

export default Layout;
