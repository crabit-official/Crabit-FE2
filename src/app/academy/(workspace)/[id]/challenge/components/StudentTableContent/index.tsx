import React from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getApprovalStatus, getStatusName, getVariantByStatus } from '@/features/academy/(workspace)/utils/challengeState';
import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import { CHALLENGE_LOG_APPROVAL_STATUS } from '@/shared/enums/challenge';
import useApprovalChallenge from '@/shared/hooks/challenge/useApprovalChallenge';
import type { IChallengeParticipant } from '@/shared/types/acadmy';

interface IStudentTableContentProps extends IChallengeParticipant {
  academyId: number;
  releasedChallengeId: number;
  session: Session;
}

function StudentTableContent({ studentProfile, studentChallenge, releasedChallengeId, academyId, session }: IStudentTableContentProps) {
  const { mutate } = useApprovalChallenge();
  const router = useRouter();
  const handleApprovalChallenge = (status: CHALLENGE_LOG_APPROVAL_STATUS) => {
    mutate({
      academyId,
      studentChallengeId: studentChallenge.studentChallengeId,
      session,
      releasedChallengeId,
      challengeLogApprovalStatus: status,
    });
  };

  return (
    <tr className="border-t border-solid border-gray-200">
      <td className="p-4 text-center">{studentProfile?.academyNickname}</td>
      <td className="p-4 text-center" colSpan={2}>
        <StateLabel
          label={getStatusName(studentChallenge?.challengeLogSubmissionStatus)}
          variant={getVariantByStatus(studentChallenge?.challengeLogSubmissionStatus)}
          className="m-auto w-[60px] break-keep px-0"
        />
      </td>
      <td className="p-4 text-center" colSpan={2}>
        <StateLabel
          label={getApprovalStatus(studentChallenge.challengeLogApprovalStatus)}
          variant={getVariantByStatus(studentChallenge.challengeLogApprovalStatus)}
          className="m-auto w-[60px] break-keep px-0"
        />
      </td>
      <td className="p-4 text-center">
        <Flex className="w-full gap-1">
          <Button
            size="sm"
            className="text-xs hover:border-main-pink hover:bg-main-pink hover:text-white"
            variant="outline"
            onClick={() => handleApprovalChallenge(CHALLENGE_LOG_APPROVAL_STATUS.APPROVED)}
          >
            승인
          </Button>
          <Button
            size="sm"
            className="text-xs hover:border-main-pink hover:bg-main-pink hover:text-white"
            variant="outline"
            onClick={() => handleApprovalChallenge(CHALLENGE_LOG_APPROVAL_STATUS.REJECTED)}
          >
            반려
          </Button>
        </Flex>
      </td>
      <td className="p-4 text-center" colSpan={3}>
        <Button
          onClick={() => router.push(`${releasedChallengeId}/student/${studentChallenge.studentChallengeId}`)}
          size="sm"
          className="m-auto w-16 text-xs text-white"
        >
          확인하기
        </Button>
      </td>
    </tr>
  );
}

export default StudentTableContent;
