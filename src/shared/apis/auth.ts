import { axiosInstance } from '../libs/axios-instance';
import type {
  TCheckVerifyCodeRequest,
  TCheckVerifyCodeResponse,
  TPostSignupRequest,
  TPostSignupResponse,
  TSendVerifyCodeRequest,
  TSendVerifyCodeResponse,
} from '../types/auth';

export const postSignup = async (request: TPostSignupRequest): Promise<TPostSignupResponse> => {
  const { data } = await axiosInstance.post(`/api/v1/auth/join`, {
    name: request.name,
    email: request.email,
    password: request.password,
    socialType: request.socialType,
    globalRole: request.globalRole,
    privacyPolicyAllowed: request.privacyPolicyAllowed,
    termsOfServiceAllowed: request.termsOfServiceAllowed,
    marketingEmailAllowed: request.marketingEmailAllowed,
  });

  return data.result as TPostSignupResponse;
};

export const postSendVerifyCode = async (request: TSendVerifyCodeRequest) => {
  const { data } = await axiosInstance.post(`/api/v1/auth/emails/send`, {
    emailVerificationPurpose: request.emailVerificationPurpose,
    email: request.email,
  });

  return data.result as TSendVerifyCodeResponse;
};

export const postCheckVerifyCode = async (request: TCheckVerifyCodeRequest) => {
  const { data } = await axiosInstance.post(`/api/v1/auth/emails/verify`, {
    code: request.code,
    email: request.email,
    emailVerificationPurpose: request.emailVerificationPurpose,
  });

  return data.result as TCheckVerifyCodeResponse;
};
