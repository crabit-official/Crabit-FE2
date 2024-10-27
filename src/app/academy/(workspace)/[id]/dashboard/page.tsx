import React from 'react';

import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import BestChallengeTable from '@/features/academy/(workspace)/components/dashboard/best-challenge-table';
import ChartView from '@/features/academy/(workspace)/components/dashboard/chart-view';
import { ACADEMY_ROLE } from '@/shared/enums/academy';

async function AcademyDashBoardPage({ params }: { params: { id: string } }) {
  const data = await getAcademyProfile(Number(params.id));

  if (data?.academyRole === ACADEMY_ROLE.STUDENT) {
    return <div>학생만 보임</div>;
  }

  return (
    <div className="grid gap-40">
      <ChartView />
      <BestChallengeTable />
    </div>
  );
}

export default AcademyDashBoardPage;
