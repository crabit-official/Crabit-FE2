import { useQuery } from '@tanstack/react-query';

import type { TCreateS3PresignedUrlRequest, TCreateS3PresignedUrlResponse } from '@/shared/types/image';

const getPresignedUrl = async ({ fileName, s3Folder }: TCreateS3PresignedUrlRequest) => {
  const res = await fetch(`/api/image/upload`, {
    method: 'POST',
    body: JSON.stringify({
      fileName,
      s3Folder,
    }),
  });

  return (await res.json()) as TCreateS3PresignedUrlResponse;
};

const useGetPresignedUrl = ({ fileName, s3Folder }: TCreateS3PresignedUrlRequest) =>
  useQuery({
    queryFn: () => getPresignedUrl({ fileName, s3Folder }),
    queryKey: ['images', fileName],
    enabled: !!fileName,
    staleTime: 5 * 60 * 1000,
  });

export default useGetPresignedUrl;
