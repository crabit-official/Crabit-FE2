import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { getServerSession, type Session } from 'next-auth';

import MyChallengeContentForm from '../../../dashboard/components/MyChallengeContentForm';
import StudentChallengeContents from '../../../dashboard/components/StudentChallengeContents';

import { getMyChallengeProgress, getStudentChallengeContents } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

async function StudentChallengePage({ params }: { params: { id: string; studentChallengeId: string } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const challengeData = await getMyChallengeProgress({ session, academyId: Number(params.id), studentChallengeId: Number(params.studentChallengeId) });

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_STUDENT_CONTENTS, params.id, params.studentChallengeId, challengeData?.releasedChallenge.releasedChallengeId],
    queryFn: () =>
      getStudentChallengeContents({
        cursor: 0,
        take: 10,
        academyId: Number(params.id),
        studentChallengeId: Number(params.studentChallengeId),
        releasedChallengeId: Number(challengeData?.releasedChallenge.releasedChallengeId),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex rowColumn="center" className="w-full">
      <Flex column="center" className="w-full max-w-[700px] gap-4 px-4 pt-10 md:px-1">
        <MyChallengeContentForm session={session} academyId={Number(params.id)} studentChallengeId={Number(params.studentChallengeId)} />
        <HydrationBoundary state={dehydratedState}>
          <StudentChallengeContents
            academyId={Number(params.id)}
            studentChallengeId={Number(params.studentChallengeId)}
            releasedChallengeId={challengeData?.releasedChallenge.releasedChallengeId}
          />
        </HydrationBoundary>
      </Flex>
    </Flex>
  );
}
export default StudentChallengePage;
