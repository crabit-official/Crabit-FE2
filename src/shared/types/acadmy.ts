import type { Session } from 'next-auth';

import type { ACADEMY_ROLE } from '@/shared/enums/academy';
import type {
  CHALLENGE_APPROVAL_STATUS,
  CHALLENGE_CATEGORY,
  CHALLENGE_LOG_APPROVAL_STATUS,
  CHALLENGE_LOG_SUBMISSION_STATUS,
  CHALLENGE_PARTICIPATION_METHODS,
  CHALLENGE_SOURCE_TYPE,
  CHALLENGE_TYPE,
} from '@/shared/enums/challenge';

export interface IGetChallengeList {
  academyId: number;
  cursor: number;
  session: Session;
  take: number;
}

export interface IAcademyProfile {
  academyId: number;
  academyMemberId: number;
  academyRole: ACADEMY_ROLE;
  memberId: number;
  nickname: string;
  point: number;
  profileImageUrl: string;
  school: string;
}

export interface IAcademyResponse<T> {
  code: string;
  hasNext?: boolean;
  isSuccess: boolean;
  message: string;
  nextCursor?: number;
  result: T;
}

export interface IAcademyChallenges {
  challengeCategory: string;
  challengeMarketVisibility: string;
  challengeParticipationMethod: string;
  content: string;
  points: number;
  studentIdList?: number[];
  thumbnailImageUrl?: string | null;
  title: string;
  totalDays: number;
}

export interface IAcademyChallenge {
  challengeTitle: string;
  releasedChallengeId: number;
}

export interface IAllStudents {
  studentList: IStudent[];
}

export interface IStudent {
  introduction: string;
  nickname: string;
  profileImageUrl: string;
  school: string;
  studentId: number;
}

export interface IAcademy {
  academyId: number;
  academyMainImageUrl: string;
  academyMemberId: number;
  academyMemberNickname: string;
  academyMemberProfileImageUrl: string;
  academyName: string;
  academyRole: string;
}

export interface IAcademyResult {
  result: {
    hasNext: boolean;
    memberAcademyList: IAcademy[];
    nextCursor: number;
  };
}

// 챌린지 목록 조회
export interface IChallenge {
  releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

export interface IChallengeResult {
  result: {
    challengeList: IChallenge[];
    hasNext: boolean;
    nextCursor: number;
  };
}

export interface IStudentChallengeDTO {
  releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

export interface IStudentChallengeStatusDTO {
  challengeLogApprovalStatus: CHALLENGE_LOG_APPROVAL_STATUS;
  challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
  endedAt: Date;
  startedAt: Date;
}

export interface IStudentChallenge {
  challenge: IStudentChallengeDTO;
  studentChallengeStatus: IStudentChallengeStatusDTO;
}

export interface IStudentChallengeResult {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentChallengeList: IStudentChallenge[];
  };
}

export interface IGetAcademyMemberDetailList {
  academyId: number;
  cursor: number;
  nickname?: string;
  session: Session;
  take: number;
}

export interface IAcademyMemberDetailListDTO {
  academyMemberId: number;
  introduction: string;
  memberId: number;
  memberName: string;
  nickname: string;
  point: number;
  profileImageUrl: string;
  school: string;
}

export interface IAcademyMemberListResult {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentList: IAcademyMemberDetailListDTO[];
  };
}

// 학원 선생님 목록 조회
export interface IAcademyInstructorListDTO {
  academyMemberId: number;
  introduction: string;
  memberId: number;
  memberName: string;
  nickname: string;
  profileImageUrl: string;
}

export interface IAcademyInstructorListResult {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentList: IAcademyInstructorListDTO[];
  };
}

// 상세 챌린지
export interface IDetailChallengeResult {
  result: {
    challengeStatusCounts: {
      allLogsSubmittedStudents: number;
      inProgressStudents: number;
      notStartedStudents: number;
      submissionFailedStudents: number;
      totalParticipants: number;
    };
    releasedChallenge: {
      challengeCategory: CHALLENGE_CATEGORY;
      challengeCoreCreatorAcademyName: string;
      challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
      challengeSource: CHALLENGE_SOURCE_TYPE;
      challengeType: CHALLENGE_TYPE;
      content: string;
      points: number;
      releasedChallengeId: number;
      thumbnailImageUrl: string;
      title: string;
      totalDays: number;
    };
  };
}

// 학생 챌린지 참여 정보 리스트
export interface IChallengeParticipant {
  studentChallenge: {
    challengeLogApprovalStatus: CHALLENGE_APPROVAL_STATUS;
    challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
    earnedPoints: number;
    endedAt: string;
    startedAt: string;
    studentChallengeId: number;
  };
  studentProfile: {
    academyMemberId: number;
    academyNickname: string;
    academyProfileImageUrl: string;
  };
}

export interface IChallengeParticipateResult {
  result: {
    challengeParticipantList: IChallengeParticipant[];
    hasNext: boolean;
    nextCursor: number;
  };
}

// 특정 챌린지 학생 인증 게시글
export interface IStudentChallengeContents {
  challengeLog: {
    content: string;
    createdAt: string;
    day: number;
    fileUrl: string;
    studentChallengeId: number;
    studentChallengeLogId: number;
  };
  studentProfile: {
    academyMemberId: number;
    academyNickname: string;
    academyProfileImageUrl: string;
  };
}

export interface IStudentChallengeContentsResults {
  result: {
    challengeLogList: IStudentChallengeContents[];
    hasNext: boolean;
    nextCursor: number;
  };
}
