export interface IAcademyProfile {
  academyId: number;
  academyMemberId: number | null;
  academyRole: string;
  memberId: number | null;
  nickname: string;
  point: null | number;
  profileImageUrl: string | null;
  school: string | null;
}

export interface IAcademyResponse<T = any> {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
}

export interface IAcademyChallenges {
  challengeCategory: string;
  challengeMarketVisibility: string;
  challengeParticipationMethod: string;
  content: string;
  imageUrl?: string | null;
  open: boolean;
  points: number;
  studentIdList?: number[];
  title: string;
  totalDays: number;
}
