export interface ICommonResponse {
  code: string;
  isSuccess: true;
  message: string;
}

export interface IAuthResponse extends ICommonResponse {
  result: {
    accessToken: string;
    globalRole: string;
    name: string;
    profileImageUrl: string;
    refreshToken: string;
    socialType: string;
  };
}
