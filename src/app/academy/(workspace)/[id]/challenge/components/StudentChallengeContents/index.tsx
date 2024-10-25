'use client';

import type { Session } from 'next-auth';

import useGetInfiniteStudentChallengeContents from '@/shared/hooks/challenge/useGetInfiniteStudentChallengeContents';

interface IStudentChallengeContents {
  academyId: number;
  releasedChallengeId: number;
  session: Session;
  studentChallengeId: number;
}

function StudentChallengeContents({ session, academyId, releasedChallengeId, studentChallengeId }: IStudentChallengeContents) {
  const { data: contents } = useGetInfiniteStudentChallengeContents(session, academyId, releasedChallengeId, studentChallengeId);

  return (
    <div>
      {contents?.pages.map((page) =>
        page.result.challengeLogList.map((content) => <div key={content.challengeLog.studentChallengeLogId}>{content.challengeLog.content}</div>),
      )}
    </div>
  );
}
export default StudentChallengeContents;
