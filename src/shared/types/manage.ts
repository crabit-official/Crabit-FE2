import type { CommonResponse } from '../apis/dto/response';

// [원장 선생님] 학생 강퇴
export type TRevokeStudentRequest = {
  academyId: number;
  academyMemberId: number;
};

export type TRevokeStudentResponse = CommonResponse<{
  academyMemberId: number;
}>;

// [원장 선생님] 강사 강퇴
export type TRevokeInstructorRequest = {
  academyId: number;
  academyMemberId: number;
};

export type TRevokeInstructorResponse = CommonResponse<{
  academyMemberId: number;
}>;

// [원장 선생님] 특정 강사에 대한 부가 설명 수정
export type TUpdateInstructorIntroductionRequest = {
  academyId: number;
  academyMemberId: number;
  description: string;
};

export type TUpdateInstructorIntroductionResponse = CommonResponse<{
  academyMemberId: number;
}>;

// [원장 선생님, 일반 강사] 특정 학생에 대한 부가 설명 수정
export type TUpdateStudentIntroductionRequest = {
  academyId: number;
  academyMemberId: number;
  description: string;
  nickname: string;
};

export type TUpdateStudentIntroductionResponse = CommonResponse<{
  academyMemberId: number;
}>;

// [학생] 학원 스페이스 탈퇴
export type TLeaveAcademyRequest = {
  academyId: number;
};

export type TLeaveAcademyResponse = CommonResponse<{
  academyMemberId: number;
}>;

// [학생] 학원 정보 조회 기능
export type TGetAcademyInfoRequest = {
  academyId: number;
};

export type TGetAcademyInfoResponse = CommonResponse<{
  academy: {
    academyId: number;
    academyName: string;
    address: string;
    addressDetail: string;
    contactNumber: string;
    email: string;
    mainImageUrl: string;
    studentCountRange: string;
  };
}>;

// [원장 선생님] 학원 정보 수정
export type TUpdateAcademyInfoRequest = {
  academyId: number;
  address: string;
  addressDetail: string;
  contactNumber: string;
  email: string;
  mainImageUrl: string;
  name: string;
  studentCountRange: string;
};

export type TUpdateAcademyInfoResponse = CommonResponse<{
  academyId: number;
}>;

// 학원에 배포한 챌린지 설정 수정
export type TUpdateChallengeSettingRequest = {
  academyId: number;
  challengeParticipationMethod: 'ASSIGNED' | 'SELF_PARTICIPATING';
  description: string;
  points: number;
  releasedChallengeId: number;
  studentIdList: number[];
  totalDays: number;
};

export type TUpdateChallengeSettingResponse = CommonResponse<{
  releasedChallengeId: number;
}>;
