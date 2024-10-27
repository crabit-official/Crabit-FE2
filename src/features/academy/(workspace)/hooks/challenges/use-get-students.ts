import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

const getAllStudents = async ({ id, cursor, accessToken, take }: { accessToken: string; cursor: number; id: number; take: number }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/academies/${id}/students?cursor=${cursor}&take=${take}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch students');
  }

  const data: AcademyStudentListResponse = await res.json();

  return data;
};

type TStudentList = {
  academyMemberId: number;
  introduction: string;
  memberId: number;
  memberName: string;
  nickname: string;
  profileImageUrl: string;
  school: string;
};

export type AcademyStudentListResponse = {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentList: TStudentList[];
  };
};

function useGetStudents(
  id: number,
  accessToken: string,
  take: number,
  queryOptions?: UseInfiniteQueryOptions<
    AcademyStudentListResponse,
    DefaultError,
    InfiniteData<AcademyStudentListResponse, number>,
    AcademyStudentListResponse,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getAllStudents({ id, cursor: pageParam, accessToken, take }),
    queryKey: ['academyStudents', id],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.result.hasNext ? allPages.length + 1 : undefined),
    ...queryOptions,
  });
}

export default useGetStudents;
