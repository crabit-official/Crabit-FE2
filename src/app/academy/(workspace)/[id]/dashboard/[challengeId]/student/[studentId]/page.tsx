import React from 'react';

import StudentChallengeContents from '../../../components/StudentChallengeContents';

interface IStudentChallengePageProps {
  params: {
    challengeId: string;
    id: string;
    studentId: string;
  };
}

function StudentChallengeDetailPage({ params }: IStudentChallengePageProps) {
  return (
    <StudentChallengeContents academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} studentChallengeId={Number(params.studentId)} />
  );
}
export default StudentChallengeDetailPage;
