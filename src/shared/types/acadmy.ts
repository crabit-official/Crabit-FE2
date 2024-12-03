import type { Session } from 'next-auth';

import type { CommonResponse } from '@/shared/apis/dto/response';
import type { ACADEMY_ROLE } from '@/shared/enums/academy';
import type {
  CHALLENGE_CATEGORY,
  CHALLENGE_LOG_APPROVAL_STATUS,
  CHALLENGE_LOG_SUBMISSION_STATUS,
  CHALLENGE_PARTICIPATION_METHODS,
  CHALLENGE_SOURCE_TYPE,
  CHALLENGE_TYPE,
  MARKET_VISIBILITY_CATEGORIES,
} from '@/shared/enums/challenge';

export interface IAcademyCreateDTO {
  academyAddress: string;
  academyAddressDetail: string;
  academyEmail: string;
  academyName: string;
  contactNumber: string;
  session: Session;
  studentCount: number;
}

export interface IPostEnrollAcademyDTO {
  academyAddress: string;
  academyAddressDetail: string;
  academyEmail: string;
  academyName: string;
  contactNumber: string;
  studentCount: number;
}

export type IPostEnrollAcademyResponse = CommonResponse<IPostEnrollAcademyDTO>;

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
  challengeCategory: CHALLENGE_CATEGORY;
  challengeMarketVisibility: MARKET_VISIBILITY_CATEGORIES;
  challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
  content: string;
  description: string | null;
  fileUrl: string | null;
  points: number;
  studentIdList: number[] | [];
  thumbnailImageUrl: string | null;
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
  academyName: string;
  academyRole: ACADEMY_ROLE;
  nickname: string;
  profileImageUrl: string;
}

export type IAcademyResult = CommonResponse<{
  hasNext: boolean;
  memberAcademyList: IAcademy[];
  nextCursor: number;
}>;

// 챌린지 목록 조회
export interface IChallenge {
  challengeCategory: CHALLENGE_CATEGORY;
  content: string;
  releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

export type IChallengeResult = CommonResponse<{
  challengeList: IChallenge[];
  hasNext: boolean;
  nextCursor: number;
}>;

export interface IStudentChallengeDTO {
  content: string;
  releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

export interface IStudentChallengeStatusDTO {
  challengeLogApprovalStatus: CHALLENGE_LOG_APPROVAL_STATUS;
  challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
  endedAt: Date;
  hasTodayChallengeLog: boolean;
  startedAt: Date;
  studentChallengeId: number;
}

export interface IStudentChallenge {
  challenge: IStudentChallengeDTO;
  studentChallengeStatus: IStudentChallengeStatusDTO;
}

export type IStudentChallengeResult = CommonResponse<{
  hasNext: boolean;
  nextCursor: number;
  studentChallengeList: IStudentChallenge[];
}>;

export interface IGetAcademyMemberDetailList {
  academyId: number;
  cursor: number;
  nickname?: string;
  take: number;
}

export interface IAcademyMemberDetailListDTO {
  academyMemberId: number;
  introduction: string;
  memberId: number;
  name: string;
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
  description: string;
  introduction: string;
  memberId: number;
  name: string;
  nickname: string;
  profileImageUrl: string;
}

export interface IAcademyInstructorListResult {
  result: {
    hasNext: boolean;
    nextCursor: number;
    teacherList: IAcademyInstructorListDTO[];
  };
}

// 학원 학생 목록 조회
export interface IAcademyStudentListDTO {
  academyMemberId: number;
  description: string;
  introduction: string;
  memberId: number;
  name: string;
  nickname: string;
  point: number;
  profileImageUrl: string;
  school: string;
}

export interface IAcademyStudentListResult {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentList: IAcademyStudentListDTO[];
  };
}

// 상세 챌린지
export type TDetailChallengeResult = CommonResponse<{
  challengeStatusCounts: {
    allLogsSubmittedStudents: number;
    approvedStudents: number;
    inProgressStudents: number;
    incompleteChallengeStudents: number;
    notStartedStudents: number;
    pendingStudents: number;
    rejectedStudents: number;
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
    description: string;
    fileUrl: string;
    points: number;
    releasedChallengeId: number;
    thumbnailImageUrl: string;
    title: string;
    totalDays: number;
  };
}>;

// 학생 챌린지 참여 정보 리스트
export interface IChallengeParticipant {
  studentChallenge: {
    challengeLogApprovalStatus: CHALLENGE_LOG_APPROVAL_STATUS;
    challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
    earnedPoints: number;
    endedAt: string;
    startedAt: string;
    studentChallengeId: number;
  };
  studentProfile: IStudentProfileDTO;
}

export interface IStudentProfileDTO {
  academyMemberId: number;
  nickname: string;
  profileImageUrl: string;
}

export type IChallengeParticipateResult = CommonResponse<{
  challengeParticipantList: IChallengeParticipant[];
  hasNext: boolean;
  nextCursor: number;
}>;

// 특정 챌린지 학생 인증 게시글
export interface IStudentChallengeContents {
  challengeLog: {
    content: string;
    createdAt: Date;
    day: number;
    fileUrl: string;
    releasedChallengeId: number;
    studentChallengeId: number;
    studentChallengeLogId: number;
  };
  studentProfile: {
    academyMemberId: number;
    nickname: string;
    profileImageUrl: string;
  };
}

export type IStudentChallengeContentsResults = CommonResponse<{
  challengeLogList: IStudentChallengeContents[];
  hasNext: boolean;
  nextCursor: number;
}>;

// 학원 탈퇴
export type IRevokeAcademyResponse = CommonResponse<{
  academyMemberId: number;
}>;

// 특정챌린지 학생 상세보기
export type TMyChallengeProgressResult = CommonResponse<{
  releasedChallenge: {
    challengeCategory: CHALLENGE_CATEGORY;
    challengeCoreCreatorAcademyName: string;
    challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
    challengeType: CHALLENGE_TYPE;
    content: string;
    description: string;
    points: number;
    releasedChallengeId: number;
    thumbnailImageUrl: string;
    title: string;
    totalDays: number;
  };
  studentChallenge: {
    challengeLogApprovalStatus: CHALLENGE_LOG_APPROVAL_STATUS;
    challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
    endedAt: Date;
    hasTodayChallengeLog: boolean;
    startedAt: Date;
    studentChallengeId: number;
  };
}>;

// 학생 챌린지 승인/반려 처리
export interface IChallengeApprovalResults {
  isSuccess: boolean;
  message: string;
  result: {
    challengeLogApprovalStatus: CHALLENGE_LOG_APPROVAL_STATUS;
    challengeLogSubmissionStatus: CHALLENGE_LOG_SUBMISSION_STATUS;
    earnedPoints: number;
    studentChallengeId: number;
  };
}

// (학생) 챌린지 인증글 작성
export interface ICreateMyChallengeResult {
  isSuccess: boolean;
  message: string;
  result: {
    studentChallengeLogId: number;
  };
}

// TOP5 학생 정보
export interface ITop5Students {
  academyMemberId: number;
  approvedChallengeCount: number;
  nickname: string;
  points: number;
  profileImageUrl: string;
  school: string;
}

export interface ITop5StudentsResult {
  isSuccess: true;
  message: string;
  result: {
    academyStudentPointsRankingList: ITop5Students[];
  };
}

// 챌린지 통계
export interface IChallengeStatistics {
  approvedParticipants: number;
  approvedRate: number;
  challengeThumbnailImageUrl: string;
  challengeTitle: string;
  inProgressParticipants: number;
  releasedAt: Date;
  releasedChallengeId: number;
  totalParticipants: number;
}

export interface IChallengeLog {
  logCount: number;
  logDate: string;
}

export interface IStatisticsResult {
  result: {
    academyChallengeStatistics: {
      averageApprovedRate: number;
    };
    highestChallengeApprovedStatistics: IChallengeStatistics;
    lowestChallengeApprovedStatistics: IChallengeStatistics;
    weeklyChallengeLogStatistics: IChallengeLog[];
  };
}

// (학생) 학생 & 다른 학생 게시물 조회
export interface IAllChallengeLogDTO {
  content: string;
  createdAt: Date;
  day: number;
  fileUrl: string;
  releasedChallengeId: number;
  studentChallengeId: number;
  studentChallengeLogId: number;
}

export type TAllChallengeResult = CommonResponse<{
  challengeLogList: {
    challengeLog: IAllChallengeLogDTO;
    studentProfile: IStudentProfileDTO;
  }[];
  hasNext: boolean;
  nextCursor: number;
}>;

// 학원 정보조회
export type TAcademyInfoResult = CommonResponse<{
  academy: {
    academyId: number;
    address: string;
    addressDetail: string;
    contactNumber: string;
    email: string;
    mainImageUrl: string;
    name: string;
    studentCount: number;
  };
}>;
export type TChallengeResult = CommonResponse<{
  releasedChallengeId: number;
}>;

export type TError = {
  error: string;
};

export type TChallengeDetailResult = CommonResponse<{
  studentAcademyProfile: IStudentProfileDTO;
  studentChallengeLog: IAllChallengeLogDTO;
}>;

export interface IStudentChallengeStatistics {
  allLogsSubmittedChallenges: number;
  approvedChallenges: number;
  inProgressChallenges: number;
  incompleteChallengeChallenges: number;
  notStartedChallenges: number;
  pendingChallenges: number;
  rejectedChallenges: number;
  submissionFailedChallenges: number;
  totalParticipateChallenges: number;
}

export type TAcademyStudentDetailResponse = CommonResponse<{
  student: IAcademyStudentListDTO;
  studentChallengeStatistics: IStudentChallengeStatistics;
}>;

// [학원 모든 멤버] 특정 학원 스페이스 유저 프로필 조회
export type TAcademyMemberProfileRequest = {
  academyId: number;
};

export type TAcademyMemberProfileResponse = CommonResponse<{
  academyId: number;
  academyMemberId: number;
  academyRole: ACADEMY_ROLE;
  introduction: string;
  memberId: number;
  nickname: string;
  point: number;
  profileImageUrl: string;
  school: string;
}>;

// [학원 모든 멤버] 학원 프로필 수정
export type TAcademyMemberEditProfileRequest = {
  academyId: number;
  introduction: string;
  nickname: string;
  profileImageUrl: string | null;
  school: string;
};

export type TAcademyMemberEditProfileResponse = CommonResponse<{
  academyId: number;
}>;

//  [원장 선생님] 특정 학원 강사, 상세 정보 조회
export type TAcademyInstructorDetailRequest = {
  academyId: number;
  academyMemberId: number;
};

export type TAcademyInstructorDetailResponse = CommonResponse<{
  teacher: {
    academyMemberId: number;
    description: string;
    introduction: string;
    memberId: number;
    name: string;
    nickname: string;
    profileImageUrl: string | null;
  };
}>;
