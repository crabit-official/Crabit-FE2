enum CHALLENGE_LOG_APPROVAL_STATUS {
  APPROVED = 'APPROVED',
  INCOMPLETE_CHALLENGE = 'INCOMPLETE_CHALLENGE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

enum CHALLENGE_LOG_SUBMISSION_STATUS {
  ALL_LOGS_SUBMITTED = 'ALL_LOGS_SUBMITTED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
  SUBMISSION_FAILED = 'SUBMISSION_FAILED',
}

enum CHALLENGE_TYPE {
  ACADEMY = 'ACADEMY',
  CRABIT = 'CRABIT',
}

enum CHALLENGE_CATEGORY {
  COPYING = 'COPYING',
  DIARY_WRITING = 'DIARY_WRITING',
  ETC = 'ETC',
  EXERCISE = 'EXERCISE',
  LIFESTYLE_HABITS = 'LIFESTYLE_HABITSs',
  NEWSPAPER = 'NEWSPAPER',
  READING = 'READING',
  STUDYING = 'STUDYING',
}

enum CHALLENGE_PARTICIPATION_METHODS {
  ASSIGNED = 'ASSIGNED',
  SELF_PARTICIPATING = 'SELF_PARTICIPATING',
}

enum CHALLENGE_SOURCE_TYPE {
  MARKET = 'MARKET',
  ORIGINAL = 'ORIGINAL',
}

enum CHALLENGE_APPROVAL_STATUS {
  APPROVED = 'APPROVED',
  INCOMPLETE_CHALLENGE = 'INCOMPLETE_CHALLENGE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export {
  CHALLENGE_APPROVAL_STATUS,
  CHALLENGE_CATEGORY,
  CHALLENGE_LOG_APPROVAL_STATUS,
  CHALLENGE_LOG_SUBMISSION_STATUS,
  CHALLENGE_PARTICIPATION_METHODS,
  CHALLENGE_SOURCE_TYPE,
  CHALLENGE_TYPE,
};