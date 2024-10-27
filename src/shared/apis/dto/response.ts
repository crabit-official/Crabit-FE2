export type CommonResponse<T = unknown> = {
  code: string;
  isSuccess: boolean;
  message: string;
  result: T;
};
