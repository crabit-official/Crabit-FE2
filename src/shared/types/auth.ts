import type { GLOBAL_ROLE, SOCIAL_TYPE } from '@/shared/enums/auth';

export type TCommonResponse<T> = {
  code: string;
  isSuccess: true;
  message: string;
  result: T;
};

// 회원가입 Request
export type TPostSignupRequest = {
  email: string;
  globalRole: GLOBAL_ROLE;
  marketingEmailAllowed: 'AGREE' | 'DISAGREE';
  name: string;
  password: string;
  privacyPolicyAllowed: 'AGREE' | 'DISAGREE';
  socialType: SOCIAL_TYPE;
  termsOfServiceAllowed: 'AGREE' | 'DISAGREE';
};

// 회원가입 Response
export type TPostSignupResponse = TCommonResponse<{
  accessToken: string;
  globalRole: GLOBAL_ROLE;
  name: string;
  profileImageUrl: string;
  refreshToken: string;
  socialType: SOCIAL_TYPE;
}>;

// 이메일 인증 코드 전송 Request
export type TSendVerifyCodeRequest = {
  email: string;
  emailVerificationPurpose: 'JOIN_VERIFIED' | 'UPDATE_PASSWORD_VERIFIED' | 'ACADEMY_REGISTRATION_VERIFIED';
};

// 이메일 인증 코드 전송 Response
export type TSendVerifyCodeResponse = TCommonResponse<{
  code: string;
  email: string;
}>;

// 이메일 인증 코드 확인 Request
export type TCheckVerifyCodeRequest = {
  code: string;
  email: string;
  emailVerificationPurpose: 'JOIN_VERIFIED' | 'UPDATE_PASSWORD_VERIFIED' | 'ACADEMY_REGISTRATION_VERIFIED';
};
// 이메일 인증 코드 확인 Response

export type TCheckVerifyCodeResponse = TCommonResponse<{
  email: string;
  isCodeValid: boolean;
}>;

// 회원가입 Response
export type IAuthResponse = TCommonResponse<{
  accessToken: string;
  globalRole: GLOBAL_ROLE;
  name: string;
  profileImageUrl: string;
  refreshToken: string;
  socialType: SOCIAL_TYPE;
}>;

export type IProfileResponse = TCommonResponse<{
  email: string;
  globalRole: GLOBAL_ROLE;
  memberId: number;
  name: string;
  profileImageUrl: string;
  socialType: SOCIAL_TYPE;
}>;

// 비밀번호 변경 (로그인하지 않은 유저)
export type TNonLoginPasswordChange = {
  email: string;
  password: string;
};

export type TNonLoginPasswordChangeResponse = TCommonResponse<{
  memberId: number;
}>;
