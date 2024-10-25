import type { Session } from 'next-auth';

import type { ACADEMY_ROLE } from '@/shared/enums/academy';
import type { CHALLENGE_LOG_APPROVAL_STATUS, CHALLENGE_LOG_SUBMISSION_STATUS } from '@/shared/enums/challenge';

export interface IGetChallengeList {
  academyId: number;
  cursor: number;
  session: Session;
  take: number;
}

export interface IAcademyProfile {
  academyId: number;
  academyMemberId: number;
  academyRole: string;
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

export interface IGetAcademyAttendeeList {
  academyId: number;
  academyRole?: ACADEMY_ROLE;
  cursor: number;
  session: Session;
  take: number;
}

export interface IJoinRequestMemberListDTO {
  academyMemberId: number;
  academyRole: ACADEMY_ROLE;
  crabitAccountProfileImageUrl: string;
  introduction: string;
  memberId: number;
  memberName: string;
  nickname: string;
  school: string;
}

export interface IAcademyAttendeeListResult {
  result: {
    hasNext: boolean;
    joinRequestMemberList: IJoinRequestMemberListDTO[];
    nextCursor: number;
  };
}
