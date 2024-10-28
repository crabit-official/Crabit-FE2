'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getParticipationMethod, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import { CHALLENGE_PARTICIPATION_METHODS } from '@/shared/enums/challenge';
import useApplyChallenge from '@/shared/hooks/market/useApplyChallenge';
import type { IPublicChallengeDetailResult } from '@/shared/types/market';

export type IPublicChallengeResult = IPublicChallengeDetailResult['result'];

interface IModalDetailProps extends IPublicChallengeResult {
  academyId: number;
  releasedChallengeId: number;
  role: ACADEMY_ROLE;
  session: Session;
}

function ModalDetail({ academyPublicChallenge, releaseInstructorProfile, session, academyId, releasedChallengeId, role }: IModalDetailProps) {
  const router = useRouter();
  const { mutate } = useApplyChallenge();

  const applyChallenge = () => {
    mutate({ session, academyId, releasedChallengeId });
  };

  return (
    <div className="fixed left-0 top-0 z-10 size-full bg-black/60" onClick={() => router.back()}>
      <Flex rowColumn="center" className="size-full px-4">
        <div
          className="relative flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-white sm:w-2/3"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button type="button" className="absolute right-4 top-4 cursor-pointer font-bold text-white hover:text-main-pink" onClick={() => router.back()}>
            X
          </button>
          {academyPublicChallenge.thumbnailImageUrl && (
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyPublicChallenge.thumbnailImageUrl}`}
              alt="challenge thumbnail"
              width={200}
              height={200}
              className="h-40 w-full bg-black object-contain"
            />
          )}
          <Flex column="start" className="gap-5 px-3 py-5">
            <Flex row="start" className="gap-1">
              <StateLabel label={getChallengeType(academyPublicChallenge.challengeType)} variant={getVariantByStatus(academyPublicChallenge.challengeType)} />
              <StateLabel
                label={getChallengeCategory(academyPublicChallenge.challengeCategory)}
                variant={getVariantByStatus(academyPublicChallenge.challengeCategory)}
              />
              <StateLabel label={getParticipationMethod(academyPublicChallenge.challengeParticipationMethod)} />
            </Flex>
            <Flex column="start" className="gap-2">
              <Typography size="h5">{academyPublicChallenge.title}</Typography>
              <Typography size="h5" as="p" className="break-keep text-xs">
                {academyPublicChallenge.content}
              </Typography>
              <Typography size="h5" as="p" className="break-keep text-xs">
                {academyPublicChallenge.challengeCoreCreatorAcademyName} - {releaseInstructorProfile.academyNickname} | DAY {academyPublicChallenge.totalDays} |
                Ⓟ {academyPublicChallenge.points}
              </Typography>
            </Flex>
          </Flex>
          {role === ACADEMY_ROLE.STUDENT && academyPublicChallenge.challengeParticipationMethod === CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING && (
            <div className="w-full p-2 text-sm">
              <Button className="text-white" onClick={applyChallenge}>
                챌린지 참여하기
              </Button>
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
}
export default ModalDetail;
