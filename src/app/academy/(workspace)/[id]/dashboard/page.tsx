import React from 'react';

import BestChallengeTable from '@/features/academy/(workspace)/components/dashboard/best-challenge-table';
import ChartView from '@/features/academy/(workspace)/components/dashboard/chart-view';

function AcademyDashBoardPage() {
  return (
    <div className="grid gap-40">
      <ChartView />
      <BestChallengeTable />
    </div>
  );
}

export default AcademyDashBoardPage;
