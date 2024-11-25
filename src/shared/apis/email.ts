import type { EMAIL_VERIFIED_TYPE } from '@/shared/enums/email';
import type { TError } from '@/shared/types/acadmy';
import type { TEmailVerifiedResponse, TVerifiedCode } from '@/shared/types/email';

interface IVerifyEmail {
  code?: string;
  email: string;
  emailVerificationPurpose: EMAIL_VERIFIED_TYPE;
}

export async function sendEmail({ emailVerificationPurpose, email }: IVerifyEmail) {
  const res = await fetch(`/api/email`, {
    method: 'POST',
    body: JSON.stringify({ emailVerificationPurpose, email }),
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TEmailVerifiedResponse;
}

export async function verifyCode({ emailVerificationPurpose, email, code }: IVerifyEmail) {
  const res = await fetch(`/api/email/verify`, {
    method: 'POST',
    body: JSON.stringify({ emailVerificationPurpose, email, code }),
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as TVerifiedCode;
}
