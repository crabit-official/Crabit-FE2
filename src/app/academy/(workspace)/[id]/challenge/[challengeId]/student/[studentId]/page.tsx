import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import StudentChallengeContents from '@/app/academy/(workspace)/[id]/challenge/components/StudentChallengeContents';
import { getStudentChallengeContents } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

interface IStudentChallenge {
  params: {
    challengeId: string;
    id: string;
    studentId: string;
  };
}

async function StudentChallengeDetailPage({ params }: IStudentChallenge) {
  const session = (await getServerSession(authOptions)) as Session;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_STUDENT_CONTENTS, params.id, params.studentId, params.challengeId],
    queryFn: () =>
      getStudentChallengeContents({
        session,
        cursor: 0,
        take: 10,
        academyId: Number(params.id),
        studentChallengeId: Number(params.studentId),
        releasedChallengeId: Number(params.challengeId),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Flex rowColumn="center" className="w-full">
        <StudentChallengeContents
          session={session}
          academyId={Number(params.id)}
          releasedChallengeId={Number(params.challengeId)}
          studentChallengeId={Number(params.studentId)}
        />
      </Flex>
    </HydrationBoundary>
  );
}

export default StudentChallengeDetailPage;
