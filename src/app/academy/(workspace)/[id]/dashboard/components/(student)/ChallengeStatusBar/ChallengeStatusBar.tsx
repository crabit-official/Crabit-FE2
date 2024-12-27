import React from 'react';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import { getChallengeLogStatus } from '@/features/academy/(workspace)/utils/challengeState';
import { CHALLENGE_LOG_SUBMISSION_STATUS } from '@/shared/enums/challenge';
import calculateChallengeDay from '@/shared/utils/calculateChallengeDay';

interface IChallengeStatusBarProps {
  challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
  hasTodayChallengeLog: boolean;
  startedAt: Date;
  totalDays: number;
}

export default function ChallengeStatusBar({ totalDays, challengeLogSubmissionStatus, hasTodayChallengeLog, startedAt }: IChallengeStatusBarProps) {
  const { variant, label } = getChallengeLogStatus(hasTodayChallengeLog, challengeLogSubmissionStatus);

  return (
    <div
      className={`grid w-full grid-cols-[min-content_auto_min-content] items-center gap-4 rounded-lg border border-solid px-3 py-2 font-medium sm:gap-6 ${hasTodayChallengeLog || challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED || challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.SUBMISSION_FAILED ? 'border-none bg-gray-100 text-gray-500' : 'border-main-deep-pink/60 text-main-deep-pink'} `}
    >
      <StateLabel label={label} variant={variant} className="w-fit whitespace-nowrap" />
      <p className="break-keep text-center text-sm md:text-base">
        {hasTodayChallengeLog &&
          challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.IN_PROGRESS &&
          `이미 DAY ${calculateChallengeDay(startedAt)} 인증을 해주셨네요 ! 앞으로 ${totalDays - calculateChallengeDay(startedAt)}일만 더 힘내볼까요?`}

        {!hasTodayChallengeLog &&
          challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.IN_PROGRESS &&
          `챌린지의 Day ${calculateChallengeDay(startedAt)} 인증을 해주세요 !`}

        {challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.NOT_STARTED && '아직 챌린지를 시작하지 않았어요 ! 1일차 인증을 진행해주세요'}
        {challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED && '챌린지를 완료했어요 !'}
        {challengeLogSubmissionStatus === CHALLENGE_LOG_SUBMISSION_STATUS.SUBMISSION_FAILED && '챌린지 인증에 실패했어요'}
      </p>
      <div className="hidden w-[60px] sm:block" />
    </div>
  );
}
