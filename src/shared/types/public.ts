import type { CommonResponse } from '@/shared/apis/dto/response';
import type { CHALLENGE_CATEGORY } from '@/shared/enums/challenge';

export type TPublicChallengesResult = CommonResponse<{
  academyPublicChallengeList: IPublicChallengeList[];
  hasNext: boolean;
  nextCursor: number;
}>;

export interface IPublicChallengeList {
  challengeCategory: CHALLENGE_CATEGORY;
  content: string;
  releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}
