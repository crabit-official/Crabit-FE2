import type { CommonResponse } from '../apis/dto/response';

export enum S3_FOLDER_NAME {
  ACADEMY_IMAGE = 'ACADEMY_IMAGE',
  CHALLENGE_CORE_FILE = 'CHALLENGE_CORE_FILE',
  CHALLENGE_CORE_THUMBNAIL_IMAGE = 'CHALLENGE_CORE_THUMBNAIL_IMAGE',
  GENERAL_STUDENT_CHALLENGE_LOG_FILE = 'GENERAL_STUDENT_CHALLENGE_LOG_FILE',
  PROFILE_IMAGE = 'PROFILE_IMAGE',
}

export type TCreateS3PresignedUrlRequest = {
  fileName: string;
  s3Folder: S3_FOLDER_NAME;
};

export type TCreateS3PresignedUrlResponse = CommonResponse<{
  keyName: string;
  url: string;
}>;
