import React from 'react';
import Image from 'next/image';
import { getServerSession, type Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeCategory, getChallengeType, getParticipationMethod, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import { getPublicChallengeDetail } from '@/shared/apis/market';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { authOptions } from '@/shared/utils/authOptions';

interface IMarketChallengeDetailProps {
  params: {
    id: string;
    slug: string[];
  };
}

async function MarketChallengeDetail({ params }: IMarketChallengeDetailProps) {
  const session = (await getServerSession(authOptions)) as Session;

  const { id, slug: paramsArray } = params;
  const [, challengeId] = paramsArray || [];

  const challenge = await getPublicChallengeDetail({ session, academyId: Number(id), releasedChallengeId: Number(challengeId) });

  return (
    <Flex rowColumn="center" className="w-full pt-10">
      <Flex column="center" className="w-full max-w-[700px] gap-2 px-4 sm:px-2">
        {challenge?.academyPublicChallenge.thumbnailImageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge?.academyPublicChallenge.thumbnailImageUrl}`}
            alt="challenge thumbnail"
            width={200}
            height={200}
            className="h-40 w-full rounded-xl bg-black/50"
          />
        )}
        <Flex column="start" className="gap-4 px-2">
          <Flex row="start" className="gap-1">
            <StateLabel
              label={getChallengeType(challenge?.academyPublicChallenge.challengeType)}
              variant={getVariantByStatus(challenge?.academyPublicChallenge.challengeType)}
            />
            <StateLabel
              label={getChallengeCategory(challenge?.academyPublicChallenge.challengeCategory)}
              variant={getVariantByStatus(challenge?.academyPublicChallenge.challengeCategory)}
            />
            <StateLabel label={getParticipationMethod(challenge?.academyPublicChallenge.challengeParticipationMethod)} />
          </Flex>
          <Flex column="start" className="gap-1">
            <Typography size="h3"> {challenge?.academyPublicChallenge.title}</Typography>
            <Typography size="h5" as="p" className="break-keep text-sm">
              {challenge?.academyPublicChallenge.content}
            </Typography>
            <Typography size="h5" as="p" className="break-keep text-xs">
              {challenge?.academyPublicChallenge.challengeCoreCreatorAcademyName} - {challenge?.releaseInstructorProfile.academyNickname} | DAY{' '}
              {challenge?.academyPublicChallenge.totalDays} | Ⓟ {challenge?.academyPublicChallenge.points}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default MarketChallengeDetail;
