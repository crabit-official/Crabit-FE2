import type { CommonResponse } from '@/shared/apis/dto/response';
import type { CHALLENGE_CATEGORY, CHALLENGE_PARTICIPATION_METHODS, CHALLENGE_TYPE } from '@/shared/enums/challenge';

export type IPublicChallengesResult = CommonResponse<{
  academyPublicChallengeList: IPublicChallengeList[];
  hasNext: boolean;
  nextCursor: number;
}>;

export interface IPublicChallengeList {
  challengeCategory: CHALLENGE_CATEGORY;
  releasedChallengeId: number;
  thumbnailImageUrl: string;
  title: string;
}

export interface IPublicChallengeDetailResult {
  result: {
    academyPublicChallenge: {
      challengeCategory: CHALLENGE_CATEGORY;
      challengeCoreCreatorAcademyName: string;
      challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
      challengeType: CHALLENGE_TYPE;
      content: string;
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
  };
}

// (학생) 자유 챌린지 신청
export interface IApplyChallengeResult {
  isSuccess: boolean;
  message: string;
  result: {
    studentChallengeId: number;
  };
}

// 챌린지 마켓 리스트 조회
export interface IMarketChallenge {
  challengeCategory: CHALLENGE_CATEGORY;
  challengeCoreId: number;
  challengeType: CHALLENGE_TYPE;
  thumbnailImageUrl: string;
  title: string;
}

export type TChallengeMarketResult = CommonResponse<{
  challengeList: IMarketChallenge[];
  hasNext: boolean;
  nextCursor: number;
}>;
