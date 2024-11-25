import type { CommonResponse } from '@/shared/apis/dto/response';

export type TEmailVerifiedResponse = CommonResponse<{
  code: string;
  email: string;
}>;

export type TVerifiedCode = CommonResponse<{ email: string; isCodeValid: boolean }>;
