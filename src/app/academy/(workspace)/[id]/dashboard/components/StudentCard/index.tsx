'use client';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoSchool } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getStatusName, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_LOG_APPROVAL_STATUS } from '@/shared/enums/challenge';
import type { IChallengeParticipant } from '@/shared/types/acadmy';

interface IStudentCardProps extends IChallengeParticipant {
  releasedChallengeId: number;
}

// TODO: 학교명 수정
function StudentCard({ studentChallenge, studentProfile, releasedChallengeId }: IStudentCardProps) {
  const router = useRouter();

  return (
    <Flex row="between" className="gap-2">
      <Flex
        onClick={() => router.push(`${releasedChallengeId}/student/${studentChallenge.studentChallengeId}`)}
        row="between"
        className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom transition-shadow duration-300 hover:shadow-hover-custom"
      >
        <Flex className="gap-4">
          <StateLabel
            label={getStatusName(studentChallenge.challengeLogSubmissionStatus)}
            variant={getVariantByStatus(studentChallenge.challengeLogSubmissionStatus)}
          />
          <Typography size="h5" as="p" className="flex items-center gap-2 text-sm font-normal sm:text-base">
            <IoSchool />
            학교명 • {studentProfile.academyNickname}
          </Typography>
        </Flex>
        <IoIosArrowForward />
      </Flex>
      {studentChallenge.challengeLogApprovalStatus === CHALLENGE_LOG_APPROVAL_STATUS.APPROVED ? (
        <Button className="w-16 rounded-lg border border-solid border-gray-100 bg-neutral-500 text-sm text-white shadow-custom transition-shadow duration-300 hover:shadow-hover-custom sm:w-20 sm:text-base">
          반려
        </Button>
      ) : (
        <Button className="w-16 rounded-lg border border-solid border-gray-100 bg-neutral-500 text-sm text-white shadow-custom transition-shadow duration-300 hover:shadow-hover-custom sm:w-20 sm:text-base">
          승인
        </Button>
      )}
    </Flex>
  );
}
export default StudentCard;
