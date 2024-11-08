import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import StudentChallengeContents from '@/app/academy/(workspace)/[id]/challenge/components/StudentChallengeContents';
import { getStudentChallengeContents } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';

interface IStudentChallenge {
  params: {
    challengeId: string;
    id: string;
    studentId: string;
  };
}

async function StudentChallengeDetailPage({ params }: IStudentChallenge) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_STUDENT_CONTENTS, params.id, params.studentId, params.challengeId],
    queryFn: () =>
      getStudentChallengeContents({
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
          academyId={Number(params.id)}
          releasedChallengeId={Number(params.challengeId)}
          studentChallengeId={Number(params.studentId)}
        />
      </Flex>
    </HydrationBoundary>
  );
}

export default StudentChallengeDetailPage;
