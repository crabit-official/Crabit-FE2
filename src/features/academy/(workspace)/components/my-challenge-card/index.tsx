import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getStatusName, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IStudentChallenge } from '@/shared/types/acadmy';
import formatDate from '@/shared/utils/date';

function MyChallengeCard({ challenge, studentChallengeStatus }: IStudentChallenge) {
  const router = useRouter();

  // TODO: 클릭시 상세 페이지 주소 변경

  return (
    <Flex
      onClick={() => router.push(`/academy/1/my-challenge/3/${challenge.releasedChallengeId}`)}
      column="between"
      className="w-full cursor-pointer gap-4 rounded-lg bg-white p-4 shadow-transparent transition-all duration-200 hover:shadow-lg md:w-3/5"
    >
      {challenge.thumbnailImageUrl && (
        <Image
          alt="이미지 설명"
          className="h-44 w-full shrink-0 rounded-lg bg-[#131315] object-contain"
          width={100}
          height={100}
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challenge.thumbnailImageUrl}`}
        />
      )}
      <Flex column="start" className="w-full gap-4 py-1">
        <Typography size="h5" className="text-sm font-medium">
          {challenge.title}
        </Typography>
      </Flex>
      <Flex row="between">
        <Flex row="end" className="gap-1">
          <Typography size="h5" className="text-xs text-neutral-200">
            {formatDate(studentChallengeStatus.startedAt)}
          </Typography>
          <Typography size="h5" className="text-xs text-neutral-200">
            ~
          </Typography>
          <Typography size="h5" className="text-xs text-neutral-200">
            {formatDate(studentChallengeStatus.endedAt)}
          </Typography>
        </Flex>
        <StateLabel
          label={getStatusName(studentChallengeStatus.challengeLogSubmissionStatus)}
          variant={getVariantByStatus(studentChallengeStatus.challengeLogSubmissionStatus)}
        />
      </Flex>
    </Flex>
  );
}
export default MyChallengeCard;
