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

export interface IStudentChallenge {
  challengeLogApprovalStatus: 'REJECTED' | 'PENDING' | 'APPROVED';
  challengeLogSubmissionStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'ALL_LOGS_SUBMITTED' | 'SUBMISSION_FAILED';
  endedAt: string;
  startedAt: string;
  studentChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

export interface IStudentChallengeResult {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentChallengeList: IStudentChallenge[];
  };
}
