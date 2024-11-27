import type { CommonResponse } from '@/shared/apis/dto/response';
import type { CHALLENGE_CATEGORY, CHALLENGE_PARTICIPATION_METHODS, CHALLENGE_TYPE } from '@/shared/enums/challenge';

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
  content: string;
  thumbnailImageUrl: string;
  title: string;
}

export type TChallengeMarketResult = CommonResponse<{
  challengeList: IMarketChallenge[];
  hasNext: boolean;
  nextCursor: number;
}>;

// 챌린지 마켓 상세 조회
export type TChallengeDetail = CommonResponse<{
  academy: {
    academyId: number;
    academyName: string;
  };
  challenge: {
    alreadyReleasedInAcademy: boolean;
    challengeCategory: CHALLENGE_CATEGORY;
    challengeCoreId: number;
    challengeType: CHALLENGE_TYPE;
    content: string;
    description: string;
    fileUrl: string;
    thumbnailImageUrl: string;
    title: string;
  };
  teacher: {
    academyMemberId: number;
    memberId: number;
    name: string;
    nickname: string;
  };
}>;

export type TReleasedChallengeResult = CommonResponse<{
  challengeCoreId: number;
  releasedChallengeId: number;
}>;

export interface IReleaseChallengeDTO {
  challengeParticipationMethod: CHALLENGE_PARTICIPATION_METHODS;
  description: string | null;
  points: number;
  studentIdList: number[] | [];
  totalDays: number;
}
