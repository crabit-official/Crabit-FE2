export interface IApiResponse {
  code: string;
  isSuccess: boolean;
  message: string;
}

export interface IProfileResponse extends IApiResponse {
  result: {
    academyId: number;
    academyRole: string;
    nickname: string;
    point: number;
    profileImageUrl: string;
    school: string;
  };
}

export interface ILoginResponse extends IApiResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    socialType: string;
  };
}
