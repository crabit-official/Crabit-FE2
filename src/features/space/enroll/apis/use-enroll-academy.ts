import type { IAcademyCreateDTO, IPostEnrollAcademyResponse } from '@/shared/types/acadmy';

export async function useEnrollAcademy(data: IAcademyCreateDTO): Promise<IPostEnrollAcademyResponse> {
  const response = await fetch('/api/academy/enroll', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result: IPostEnrollAcademyResponse = await response.json();

  return result;
}
