import { FREEMIUM_TIRE } from '@/shared/enums/academy';
import {
  CHALLENGE_CATEGORY,
  CHALLENGE_LOG_APPROVAL_STATUS,
  CHALLENGE_LOG_SUBMISSION_STATUS,
  CHALLENGE_PARTICIPATION_METHODS,
  CHALLENGE_TYPE,
  MARKET_VISIBILITY_CATEGORIES,
} from '@/shared/enums/challenge';

export function getVariantByStatus(
  status: CHALLENGE_LOG_SUBMISSION_STATUS | CHALLENGE_TYPE | CHALLENGE_CATEGORY | CHALLENGE_LOG_APPROVAL_STATUS | FREEMIUM_TIRE,
) {
  switch (status) {
    case CHALLENGE_LOG_SUBMISSION_STATUS.NOT_STARTED:
    case CHALLENGE_CATEGORY.NEWSPAPER:
    case CHALLENGE_LOG_APPROVAL_STATUS.INCOMPLETE_CHALLENGE:
    case FREEMIUM_TIRE.BASIC:
      return 'gray';
    case CHALLENGE_LOG_SUBMISSION_STATUS.IN_PROGRESS:
    case CHALLENGE_CATEGORY.DIARY_WRITING:
    case FREEMIUM_TIRE.STANDARD:
      return 'green';
    case CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED:
    case CHALLENGE_TYPE.ACADEMY:
    case CHALLENGE_CATEGORY.EXERCISE:
    case CHALLENGE_LOG_APPROVAL_STATUS.APPROVED:
      return 'blue';
    case CHALLENGE_LOG_SUBMISSION_STATUS.SUBMISSION_FAILED:
    case CHALLENGE_TYPE.CRABIT:
    case CHALLENGE_CATEGORY.COPYING:
    case CHALLENGE_LOG_APPROVAL_STATUS.REJECTED:
      return 'red';
    case CHALLENGE_CATEGORY.LIFESTYLE_HABITS:
    case FREEMIUM_TIRE.ENTERPRISE:
      return 'purple';
    case CHALLENGE_CATEGORY.ETC:
    case FREEMIUM_TIRE.PREMIUM:
      return 'yellow';
    case CHALLENGE_CATEGORY.STUDYING:
    case CHALLENGE_LOG_APPROVAL_STATUS.PENDING:
      return 'cyan';
    case CHALLENGE_CATEGORY.READING:
    case FREEMIUM_TIRE.STARTER:
      return 'lime';
    default:
      return 'gray';
  }
}

export function getStatusName(status: CHALLENGE_LOG_SUBMISSION_STATUS) {
  switch (status) {
    case CHALLENGE_LOG_SUBMISSION_STATUS.NOT_STARTED:
      return '시작 전';
    case CHALLENGE_LOG_SUBMISSION_STATUS.IN_PROGRESS:
      return '진행 중';
    case CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED:
      return '제출 완료';
    case CHALLENGE_LOG_SUBMISSION_STATUS.SUBMISSION_FAILED:
      return '제출 실패';
    default:
      return 'gray';
  }
}

export function getChallengeType(type: CHALLENGE_TYPE) {
  switch (type) {
    case CHALLENGE_TYPE.CRABIT:
      return '크래빗 공식 챌린지';
    case CHALLENGE_TYPE.ACADEMY:
      return '학원 챌린지';
    default:
      return '크래빗 공식 챌린지';
  }
}

export function getChallengeCategory(category: CHALLENGE_CATEGORY) {
  switch (category) {
    case CHALLENGE_CATEGORY.READING:
      return '독서 챌린지';
    case CHALLENGE_CATEGORY.COPYING:
      return '필사 챌린지';
    case CHALLENGE_CATEGORY.LIFESTYLE_HABITS:
      return '습관 챌린지';
    case CHALLENGE_CATEGORY.NEWSPAPER:
      return '신문 읽기 챌린지';
    case CHALLENGE_CATEGORY.STUDYING:
      return '공부 챌린지';
    case CHALLENGE_CATEGORY.ETC:
      return '기타';
    case CHALLENGE_CATEGORY.DIARY_WRITING:
      return '매일 쓰기 챌린지';
    case CHALLENGE_CATEGORY.EXERCISE:
      return '운동 챌린지';
    default:
      return '공부 챌린지';
  }
}

export function getApprovalStatus(status: CHALLENGE_LOG_APPROVAL_STATUS) {
  switch (status) {
    case CHALLENGE_LOG_APPROVAL_STATUS.APPROVED:
      return '승인';
    case CHALLENGE_LOG_APPROVAL_STATUS.PENDING:
      return '대기 중';
    case CHALLENGE_LOG_APPROVAL_STATUS.REJECTED:
      return '반려';
    case CHALLENGE_LOG_APPROVAL_STATUS.INCOMPLETE_CHALLENGE:
      return '실패';
    default:
      return '대기 중';
  }
}

export function getParticipationMethod(type: CHALLENGE_PARTICIPATION_METHODS) {
  switch (type) {
    case CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING:
      return '참여 챌린지';
    case CHALLENGE_PARTICIPATION_METHODS.ASSIGNED:
      return '배정 챌린지';
    default:
      return '참여 챌린지';
  }
}

export function getVisibilityType(category: MARKET_VISIBILITY_CATEGORIES) {
  switch (category) {
    case MARKET_VISIBILITY_CATEGORIES.PUBLIC:
      return '공개';
    case MARKET_VISIBILITY_CATEGORIES.PROTECTED:
      return '공개하지 않음';
    default:
      return '공개하지 않음';
  }
}
