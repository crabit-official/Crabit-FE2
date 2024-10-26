import { MdMode } from 'react-icons/md';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import Image from 'next/image';
import type { Session } from 'next-auth';

import ChallengeStudentList from '@/features/academy/(workspace)/components/challenge/challenge-student-list';
import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import { getStudentsChallengeProgress } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { queryKeys } from '@/shared/constants/query-keys';
import type { IDetailChallengeResult } from '@/shared/types/acadmy';

interface IChallengeDetailProps {
  academyId: number;
  challenge: IDetailChallengeResult;
  releasedChallengeId: number;
  session: Session;
}

async function ChallengeDetail({ challenge, session, academyId, releasedChallengeId }: IChallengeDetailProps) {
  // 특정 챌린지에 참여하는 학생들의 진행도 관련 정보 리스트 조회
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.CHALLENGE_STUDENT_PROGRESS_LIST],
    queryFn: () => getStudentsChallengeProgress({ session, cursor: 0, take: 5, academyId, releasedChallengeId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Flex rowColumn="center" className="w-full gap-10 px-4 py-20">
      <Flex rowColumn="center" className="w-full gap-4">
        <Typography size="h2">{challenge?.result.releasedChallenge.title}</Typography>
        {challenge?.result.releasedChallenge.thumbnailImageUrl && (
          <Image
            className="h-36 w-full max-w-[600px] rounded-lg bg-black object-contain"
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge?.result?.releasedChallenge.thumbnailImageUrl}`}
            alt="thumbnail image"
            width="500"
            height="100"
          />
        )}
        <Flex row="center" className="gap-2">
          <StateLabel
            label={getChallengeType(challenge?.result?.releasedChallenge.challengeType)}
            variant={getVariantByStatus(challenge?.result?.releasedChallenge.challengeType)}
          />
          <StateLabel
            label={getChallengeCategory(challenge?.result?.releasedChallenge.challengeCategory)}
            variant={getVariantByStatus(challenge?.result?.releasedChallenge.challengeCategory)}
          />
        </Flex>
      </Flex>
      <Flex column="center" className="relative w-full max-w-[850px] gap-1 rounded-lg border border-solid border-gray-200 bg-main-white/50 p-4">
        <p>
          <strong className="font-bold text-main-pink">챌린지 진행 방법</strong> : {challenge?.result?.releasedChallenge.content}
        </p>
        <p>
          <strong className="font-bold text-main-pink">챌린지 기간</strong> : Day {challenge?.result?.releasedChallenge.totalDays}
        </p>
        <p className="font-bold text-main-pink">Ⓟ {challenge?.result?.releasedChallenge.points}</p>
        <Flex className="absolute bottom-1 right-1">
          <MdMode size={25} className="peer cursor-pointer px-1 hover:text-main-pink" />
        </Flex>
      </Flex>

      <HydrationBoundary state={dehydratedState}>
        <ChallengeStudentList session={session} academyId={academyId} releasedChallengeId={releasedChallengeId} />
      </HydrationBoundary>
    </Flex>
  );
}
export default ChallengeDetail;
