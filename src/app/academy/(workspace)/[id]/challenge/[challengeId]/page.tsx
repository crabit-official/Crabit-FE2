import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import Image from 'next/image';
import { getServerSession, type Session } from 'next-auth';

import ChallengeStudentList from '@/features/academy/(workspace)/components/challenge/challenge-student-list';
import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import { getStudentsChallengeProgress, getTeacherChallengeDetail } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import { authOptions } from '@/shared/utils/authOptions';

async function ChallengeDetailPage({
  params,
}: {
  params: {
    challengeId: string;
    id: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as Session;

  // 특정 챌린지 상세 정보
  const res = await getTeacherChallengeDetail({
    session,
    releasedChallengeId: Number(params.challengeId),
    academyId: Number(params.id),
  });

  // 특정 챌린지에 참여하는 학생들의 진행도 관련 정보 리스트 조회
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_STUDENT_PROGRESS_LIST],
    queryFn: () => getStudentsChallengeProgress({ session, cursor: 0, take: 5, academyId: Number(params.id), releasedChallengeId: Number(params.challengeId) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex rowColumn="center" className="gap-10 px-4 py-20">
      <Flex rowColumn="center" className="w-full gap-4">
        <Typography size="h2">{res?.releasedChallenge.title}</Typography>
        {res?.releasedChallenge.thumbnailImageUrl && (
          <Image
            className="h-36 w-full max-w-[600px] rounded-lg bg-black object-contain"
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${res?.releasedChallenge.thumbnailImageUrl}`}
            alt="thumbnail image"
            width="500"
            height="100"
          />
        )}
        <Flex row="center" className="gap-2">
          <StateLabel label={getChallengeType(res?.releasedChallenge.challengeType)} variant={getVariantByStatus(res?.releasedChallenge.challengeType)} />
          <StateLabel
            label={getChallengeCategory(res?.releasedChallenge.challengeCategory)}
            variant={getVariantByStatus(res?.releasedChallenge.challengeCategory)}
          />
        </Flex>
      </Flex>
      <Flex column="center" className="w-full max-w-[850px] gap-1 rounded-lg border border-solid border-gray-200 bg-main-white/50 p-4">
        <p>
          <strong className="font-bold text-main-pink">챌린지 진행 방법</strong> : {res?.releasedChallenge.content}
        </p>
        <p>
          <strong className="font-bold text-main-pink">챌린지 기간</strong> : Day {res?.releasedChallenge.totalDays}
        </p>
        <p className="font-bold text-main-pink">Ⓟ {res?.releasedChallenge.points}</p>
      </Flex>
      <HydrationBoundary state={dehydratedState}>
        <ChallengeStudentList session={session} academyId={Number(params.id)} releasedChallengeId={Number(params.challengeId)} />
      </HydrationBoundary>
    </Flex>
  );
}

export default ChallengeDetailPage;
