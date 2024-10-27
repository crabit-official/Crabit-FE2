import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import Image from 'next/image';
import type { Session } from 'next-auth';

import ChallengeStudentList from '@/features/academy/(workspace)/components/challenge/challenge-student-list';
import { getChallengeCategory, getChallengeType } from '@/features/academy/(workspace)/utils/challengeState';
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
    <div className="grid-rows-[min-content, auto] grid w-full max-w-[1000px] place-items-center">
      <Flex rowColumn="center" className="w-full max-w-[700px] gap-10 px-4 py-20">
        <Flex rowColumn="center" className="w-full gap-10">
          {challenge?.result.releasedChallenge.thumbnailImageUrl && (
            <Image
              className="h-80 w-full rounded-2xl bg-black object-contain"
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge?.result?.releasedChallenge.thumbnailImageUrl}`}
              alt="thumbnail image"
              width="500"
              height="100"
            />
          )}
          <Flex column="start" className="w-full px-1">
            <Flex row="start" className="items-center gap-2">
              <Typography size="h5" className="text-sm text-neutral-500">
                {getChallengeType(challenge?.result?.releasedChallenge.challengeType)}
              </Typography>
              <div className="h-3 w-px rounded-[1px] bg-neutral-500" />
              <Typography size="h5" className="text-sm text-neutral-500">
                {getChallengeCategory(challenge?.result?.releasedChallenge.challengeCategory)}
              </Typography>
            </Flex>
            <Typography size="h1" className="text-start">
              {challenge?.result.releasedChallenge.title}
            </Typography>
          </Flex>
        </Flex>
        <Flex column="center" className="w-full gap-1 px-1">
          <Typography size="h4" className="break-keep text-sm font-medium text-neutral-700 sm:text-base">
            📌 챌린지 진행 방법 : {challenge?.result?.releasedChallenge.content}
          </Typography>
          <Typography size="h4" className="break-keep text-sm font-medium text-neutral-700 sm:text-base">
            🗓️ 챌린지 기간 : {challenge?.result?.releasedChallenge.totalDays}
          </Typography>
          <Typography size="h4" className="break-keep text-sm font-medium text-neutral-700 sm:text-base">
            🎖️ 포인트 : Ⓟ {challenge?.result?.releasedChallenge.points}
          </Typography>
        </Flex>
      </Flex>
      <HydrationBoundary state={dehydratedState}>
        <ChallengeStudentList session={session} academyId={academyId} releasedChallengeId={releasedChallengeId} />
      </HydrationBoundary>
    </div>
  );
}
export default ChallengeDetail;
