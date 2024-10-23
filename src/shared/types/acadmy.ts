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
