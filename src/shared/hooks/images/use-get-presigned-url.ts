import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';

import type { IFetchResponse, IPresignedUrl } from '@/shared/types/images';

const getPresignedUrl = async (fileName: string) => {
  const session = await getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/s3/presigned/upload?fileName=${fileName}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const data: IFetchResponse<IPresignedUrl> = await res.json();

  return data.result;
};

const useGetPresignedUrl = (fileName: string) =>
  useQuery({
    queryFn: () => getPresignedUrl(fileName),
    queryKey: ['images', fileName],
    enabled: !!fileName,
    staleTime: 5 * 60 * 1000,
  });

export default useGetPresignedUrl;
