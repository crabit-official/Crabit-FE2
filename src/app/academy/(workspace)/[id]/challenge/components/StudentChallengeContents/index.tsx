'use client';

import Image from 'next/image';
import type { Session } from 'next-auth';

import StudentChallengeContent from '@/app/academy/(workspace)/[id]/challenge/components/StudentChallengeContent';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
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
    <Flex column="center" className="relative w-full max-w-[1000px] gap-10 py-10">
      <Image src="/images/logo_goal.webp" alt="bg-logo" width={200} height={200} className="absolute left-0 top-10 opacity-40" />
      <Typography size="h3" className="text-center">
        챌린지 인증 게시물 목록
      </Typography>
      <Flex rowColumn="center" className="z-10 gap-2 px-4 md:px-0">
        {contents?.pages.map((page) =>
          page?.result?.challengeLogList.map((content) => <StudentChallengeContent {...content} key={content.challengeLog.studentChallengeLogId} />),
        )}
      </Flex>
    </Flex>
  );
}
export default StudentChallengeContents;
