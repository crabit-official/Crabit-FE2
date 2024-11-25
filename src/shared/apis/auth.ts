import { axiosInstance } from '../libs/axios-instance';
import type { TPostSignupRequest, TPostSignupResponse } from '../types/auth';

export const postSignup = async (request: TPostSignupRequest): Promise<TPostSignupResponse> => {
  const { data } = await axiosInstance.post(`/api/v1/auth/join`, {
    name: request.name,
    email: request.email,
    password: request.password,
    socialType: request.socialType,
    globalRole: request.globalRole,
    privacyPolicyAllowed: request.privacyPolicyAllowed,
    termsOfServiceAllowed: request.termsOfServiceAllowed,
  });

  return data.result as TPostSignupResponse;
};
