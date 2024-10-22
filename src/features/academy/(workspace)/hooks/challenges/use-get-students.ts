import { useInfiniteQuery } from '@tanstack/react-query';

import type { IAcademyResponse, IAllStudents } from '@/shared/types/acadmy';

const getAllStudents = async ({ id, cursor, accessToken }: { accessToken: string; cursor: number; id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}/students?cursor=${cursor}&take=10`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: IAcademyResponse<IAllStudents> = await res.json();
  return data;
};

const useGetStudents = ({ id, accessToken }: { accessToken: string; id: string }) =>
  useInfiniteQuery({
    queryKey: ['students', id],
    queryFn: ({ pageParam = 0 }) => getAllStudents({ id, cursor: pageParam, accessToken }),
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
    initialPageParam: 0,
    enabled: !!accessToken && !!id,
    select: (data) => data.pages,
  });

export default useGetStudents;
