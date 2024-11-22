import type { GLOBAL_ROLE, SOCIAL_TYPE } from '@/shared/enums/auth';

export interface ICommonResponse {
  code: string;
  isSuccess: true;
  message: string;
}

export interface IAuthResponse extends ICommonResponse {
  result: {
    accessToken: string;
    globalRole: GLOBAL_ROLE;
    name: string;
    profileImageUrl: string;
    refreshToken: string;
    socialType: SOCIAL_TYPE;
  };
}

export interface IProfileResponse extends ICommonResponse {
  result: {
    email: string;
    globalRole: GLOBAL_ROLE;
    memberId: 0;
    name: string;
    profileImageUrl: string;
    socialType: SOCIAL_TYPE;
  };
}
