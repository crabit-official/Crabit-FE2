import React from 'react';

import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import AcademyTitle from '@/features/academy/(workspace)/components/dashboard/academy-title';
import Error from '@/features/academy/(workspace)/components/error';

interface ILayout {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { id: string };
}

async function Layout({ children, params, modal }: ILayout) {
  const data = await getAcademyProfile(params.id);

  if (!data?.academyRole) {
    return <Error label="학원에 대한 접근 권한이 없습니다." className="pt-20" />;
  }

  return (
    <div className="xl:px-30 max-w-8xl container mx-auto px-4 pb-8 pt-12">
      <div className="grid gap-20">
        <AcademyTitle />
        {children}
        {modal}
      </div>
    </div>
  );
}

export default Layout;
