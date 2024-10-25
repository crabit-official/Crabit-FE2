import { CHALLENGE_LOG_SUBMISSION_STATUS } from '@/shared/enums/challenge';

export function getVariantByStatus(status: CHALLENGE_LOG_SUBMISSION_STATUS) {
  switch (status) {
    case CHALLENGE_LOG_SUBMISSION_STATUS.NOT_STARTED:
      return 'gray';
    case CHALLENGE_LOG_SUBMISSION_STATUS.IN_PROGRESS:
      return 'green';
    case CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED:
      return 'blue';
    case CHALLENGE_LOG_SUBMISSION_STATUS.SUBMISSION_FAILED:
      return 'red';
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
