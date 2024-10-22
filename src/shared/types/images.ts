export interface IFetchResponse<T = any> {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
}

export interface IPresignedUrl {
  keyName: string;
  url: string;
}
