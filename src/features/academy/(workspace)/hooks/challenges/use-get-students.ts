import type { DefaultError, InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

const getAllStudents = async ({ id, cursor, accessToken, take }: { accessToken: string; cursor: number; id: string; take: number }) => {
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

  return data; // Assuming result is the part that conforms to AcademyStudentListResponse
};

type TStudentList = {
  introduction: string;
  nickname: string;
  profileImageUrl: string;
  school: string;
  studentId: number;
};

export type AcademyStudentListResponse = {
  result: {
    hasNext: boolean;
    nextCursor: number;
    studentList: TStudentList[];
  };
};

function useGetStudents(
  id: string,
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

// const useGetStudents = ({ id, accessToken }: { accessToken: string; id: string }) =>
//   useInfiniteQuery({
//     queryKey: ['students', id],
//     queryFn: ({ pageParam = 0 }) => getAllStudents({ id, cursor: pageParam, accessToken }),
//     getNextPageParam: (lastPage) => lastPage.nextCursor || null,
//     initialPageParam: 0,
//     enabled: !!accessToken && !!id,
//     select: (data) => data.pages,
//   });

export default useGetStudents;
