import React from 'react';
import { getServerSession, type Session } from 'next-auth';

import getAcademyProfile from '@/features/academy/(workspace)/api/get-academy-profile';
import BestChallengeTable from '@/features/academy/(workspace)/components/dashboard/best-challenge-table';
import ChartView from '@/features/academy/(workspace)/components/dashboard/chart-view';
import { getTop5Students } from '@/shared/apis/academy';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import { authOptions } from '@/shared/utils/authOptions';

async function AcademyDashBoardPage({ params }: { params: { id: string } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const data = await getAcademyProfile(Number(params.id));
  const topStudents = await getTop5Students({ session, academyId: Number(params.id) });

  if (data?.academyRole === ACADEMY_ROLE.STUDENT) {
    return (
      <div className="grid gap-40">
        <BestChallengeTable topStudents={topStudents} />
      </div>
    );
  }

  return (
    <div className="grid gap-40">
      <ChartView />
      <BestChallengeTable topStudents={topStudents} />
    </div>
  );
}

export default AcademyDashBoardPage;
