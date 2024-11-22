import React from 'react';
import { cookies } from 'next/headers';

import WorkspaceTab from '@/features/academy/(workspace)/components/workspace-tab';

interface ILayoutProps {
  children: React.ReactNode;
  params: {
    id: number;
  };
}

async function Layout({ children, params }: ILayoutProps) {
  const cookieStore = cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${Number(params.id)}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `accessToken=${cookieStore.get('accessToken')?.value}`,
    },
  });

  const res = await response.json();

  console.log(res);

  return (
    <>
      <WorkspaceTab role={res?.result?.academyRole} />
      <div className="xl:px-30 max-w-8xl container mx-auto h-full">
        <div className="grid">
          <div className="col-span-4 place-items-center border-x lg:col-span-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
