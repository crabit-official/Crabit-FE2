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

export type TPostSignupResponse = TCommonResponse<{
  accessToken: string;
  globalRole: GLOBAL_ROLE;
  name: string;
  profileImageUrl: string;
  refreshToken: string;
  socialType: SOCIAL_TYPE;
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
