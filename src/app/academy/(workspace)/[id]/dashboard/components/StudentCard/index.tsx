'use client';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getStatusName, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_LOG_APPROVAL_STATUS, CHALLENGE_LOG_SUBMISSION_STATUS } from '@/shared/enums/challenge';
import useApprovalChallenge from '@/shared/hooks/challenge/useApprovalChallenge';
import type { IChallengeParticipant } from '@/shared/types/acadmy';

interface IStudentCardProps extends IChallengeParticipant {
  academyId: number;
  releasedChallengeId: number;
}

function StudentCard({ studentChallenge, academyId, studentProfile, releasedChallengeId }: IStudentCardProps) {
  const router = useRouter();
  const { mutate } = useApprovalChallenge({ academyId, releasedChallengeId });

  const handleApprovalChallenge = (status: CHALLENGE_LOG_APPROVAL_STATUS) => {
    mutate({
      academyId,
      studentChallengeId: studentChallenge.studentChallengeId,
      releasedChallengeId,
      challengeLogApprovalStatus: status,
    });
  };

  return (
    <Flex row="between" className="h-24 gap-2">
      <Flex
        onClick={() => router.push(`${releasedChallengeId}/student/${studentChallenge.studentChallengeId}`)}
        row="between"
        className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
      >
        <Flex column="start" className="gap-2">
          <Flex className="items-center gap-2">
            <StateLabel
              className="w-fit"
              label={getStatusName(studentChallenge.challengeLogSubmissionStatus)}
              variant={getVariantByStatus(studentChallenge.challengeLogSubmissionStatus)}
            />
            <Flex className="gap-1">
              <Typography size="h5" as="p" className="flex items-center gap-2 text-xs font-normal sm:text-sm">
                {studentProfile.nickname}
              </Typography>
              <Typography size="h5" as="p" className="hidden items-center gap-2 font-normal sm:block sm:text-sm">
                • {studentProfile.school}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
        <IoIosArrowForward />
      </Flex>
      {studentChallenge.challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED && (
        <Flex column="center" className="w-20 gap-1">
          <Button
            onClick={() => handleApprovalChallenge(CHALLENGE_LOG_APPROVAL_STATUS.APPROVED)}
            className="w-full rounded-lg border border-solid border-gray-100 bg-main-deep-pink/90 px-3 text-sm text-white sm:text-base"
          >
            승인
          </Button>
          <Button
            onClick={() => handleApprovalChallenge(CHALLENGE_LOG_APPROVAL_STATUS.REJECTED)}
            className="w-full rounded-lg border border-solid border-gray-100 bg-gray-500/80 px-3 text-sm text-white sm:text-base"
          >
            반려
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

function StudentCardSkeleton() {
  return (
    <Flex row="between" className="w-full gap-2">
      <Skeleton height={96} className="rounded-lg" />
    </Flex>
  );
}

StudentCard.Skeleton = StudentCardSkeleton;

export default StudentCard;
