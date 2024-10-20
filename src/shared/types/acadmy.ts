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

export interface IAcademyResponse {
  code: string;
  isSuccess: boolean;
  message: string;
  result: IAcademyProfile;
}
