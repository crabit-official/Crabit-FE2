import type { IStudentChallengeStatistics } from '@/shared/types/acadmy';

export type TStudentStatistics = {
  [K in keyof IStudentChallengeStatistics]: string;
};

export const STUDENT_STATISTICS: TStudentStatistics = {
  allLogsSubmittedChallenges: '제출된 챌린지 수',
  approvedChallenges: '승인된 챌린지 수',
  inProgressChallenges: '진행 중인 챌린지 수',
  incompleteChallengeChallenges: '미완료된 챌린지 수',
  notStartedChallenges: '시작하지 않은 챌린지 수',
  pendingChallenges: '승인 대기 중인 챌린지 수',
  rejectedChallenges: '거절된 챌린지 수',
  submissionFailedChallenges: '제출 실패한 챌린지 수',
  totalParticipateChallenges: '총 참여 챌린지 수',
};
