import type { CommonResponse } from '@/shared/apis/dto/response';
import type { TError } from '@/shared/types/acadmy';

interface IProfileResponse {
  memberId: string;
}

export async function editProfile({ name, profileImageUrl }: { name: string; profileImageUrl: string | null }) {
  const res = await fetch(`/api/auth/profile`, { method: 'PUT', body: JSON.stringify({ profileImageUrl, name }) });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<IProfileResponse>;
}

export async function changePassword({ password }: { password: string }) {
  const res = await fetch(`/api/auth/password`, {
    method: 'PUT',
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<IProfileResponse>;
}

export async function deleteAccount() {
  const res = await fetch('/api/auth/profile', {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<IProfileResponse>;
}

export async function changePassword({ email, password }: { email: string; password: string }) {
  const res = await fetch(`/api/auth/password`, {
    method: 'PUT',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData: TError = await res.json();
    throw new Error(errorData.error);
  }

  return (await res.json()) as CommonResponse<{ memberId: number }>;
}
