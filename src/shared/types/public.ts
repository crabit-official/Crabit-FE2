import type { CommonResponse } from '@/shared/apis/dto/response';
import type { CHALLENGE_CATEGORY, CHALLENGE_PARTICIPATION_METHODS, CHALLENGE_TYPE } from '@/shared/enums/challenge';

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

export type TPublicChallengeDetailResult = CommonResponse<{
  academyPublicChallenge: {
    challengeCategory: CHALLENGE_CATEGORY;
    challengeCoreCreatorAcademyName: string;
    challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
    challengeType: CHALLENGE_TYPE;
    content: string;
    description: string;
    fileUrl: string;
    points: number;
    releasedChallengeId: number;
    thumbnailImageUrl: string;
    title: string;
    totalDays: number;
  };
  releaseInstructorProfile: {
    academyMemberId: number;
    academyNickname: string;
    academyProfileImageUrl: string;
  };
}>;
