export function getVariantByStatus(status: 'NOT_STARTED' | 'IN_PROGRESS' | 'ALL_LOGS_SUBMITTED' | 'SUBMISSION_FAILED') {
  switch (status) {
    case 'NOT_STARTED':
      return 'gray';
    case 'IN_PROGRESS':
      return 'green';
    case 'ALL_LOGS_SUBMITTED':
      return 'blue';
    case 'SUBMISSION_FAILED':
      return 'red';
    default:
      return 'gray';
  }
}

export function getStatusName(status: 'NOT_STARTED' | 'IN_PROGRESS' | 'ALL_LOGS_SUBMITTED' | 'SUBMISSION_FAILED') {
  switch (status) {
    case 'NOT_STARTED':
      return '시작 전';
    case 'IN_PROGRESS':
      return '진행중';
    case 'ALL_LOGS_SUBMITTED':
      return '제출 완료';
    case 'SUBMISSION_FAILED':
      return '제출 실패';
    default:
      return 'gray';
  }
}
