import type { EMAIL_VERIFIED_TYPE } from '@/shared/enums/email';
import type { TError } from '@/shared/types/acadmy';
import type { TEmailVerifiedResponse } from '@/shared/types/email';

export async function sendEmail({ emailVerificationPurpose, email }: { email: string; emailVerificationPurpose: EMAIL_VERIFIED_TYPE }) {
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
