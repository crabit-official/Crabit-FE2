import { useQuery } from '@tanstack/react-query';

import type { IAcademyResponse } from '@/shared/types/acadmy';
import type { IPresignedUrl } from '@/shared/types/images';

const getPresignedUrl = async (fileName: string) => {
  const res = await fetch(`/api/image/upload`, {
    method: 'POST',
    body: JSON.stringify({
      fileName,
    }),
  });

  return (await res.json()) as IAcademyResponse<IPresignedUrl>;
};

const useGetPresignedUrl = (fileName: string) =>
  useQuery({
    queryFn: () => getPresignedUrl(fileName),
    queryKey: ['images', fileName],
    enabled: !!fileName,
    staleTime: 5 * 60 * 1000,
  });

export default useGetPresignedUrl;
