import { CHALLENGE_CATEGORY, CHALLENGE_LOG_SUBMISSION_STATUS } from '@/shared/enums/challenge';

export interface ITabMenu {
  tab: string;
  text: string;
}

const PRINCIPAL_TAB_MENU = [
  { tab: 'challenge', text: '챌린지' },
  { tab: 'student', text: '학생' },
  { tab: 'statistics', text: '통계' },
];

const ALL_TAB = [{ tab: 'challenge', text: '챌린지' }];

const STUDENT_TAB_MENU = [
  { tab: 'create', text: '챌린지' },
  { tab: 'my-challenge', text: 'MY 챌린지' },
];

const MARKET_TAB_MENU = [
  { tab: 'crabit', text: '크래빗 공식' },
  { tab: 'academy', text: '기관 챌린지' },
];

const SUBMISSION_STATU_MENU = [
  {
    tab: 'all',
    text: '모든 챌린지',
  },
  {
    tab: 'not-started',
    text: '시작 전',
  },
  {
    tab: 'progress',
    text: '진행 중',
  },
  {
    tab: 'submit',
    text: '제출 완료',
  },
  {
    tab: 'failed',
    text: '제출 실패',
  },
];

const PUBLIC_MENU = [
  {
    tab: 'all',
    text: '모든 챌린지',
  },
  {
    tab: 'studying',
    text: '공부 챌린지',
  },
  {
    tab: 'exercise',
    text: '운동 챌린지',
  },
  {
    tab: 'copying',
    text: '필사 챌린지',
  },
  {
    tab: 'habit',
    text: '습관 챌린지',
  },
  {
    tab: 'reading',
    text: '독서 챌린지',
  },
  {
    tab: 'newspaper',
    text: '신문 읽기 챌린지',
  },

  {
    tab: 'diary-writing',
    text: '매일 쓰기 챌린지',
  },
  {
    tab: 'etc',
    text: '기타',
  },
];

const PUBLIC_CATEGORY_NAME: Record<string, CHALLENGE_CATEGORY> = {
  'studying': CHALLENGE_CATEGORY.STUDYING,
  'exercise': CHALLENGE_CATEGORY.EXERCISE,
  'copying': CHALLENGE_CATEGORY.COPYING,
  'habit': CHALLENGE_CATEGORY.LIFESTYLE_HABITS,
  'reading': CHALLENGE_CATEGORY.READING,
  'newspaper': CHALLENGE_CATEGORY.NEWSPAPER,
  'diary-writing': CHALLENGE_CATEGORY.DIARY_WRITING,
  'etc': CHALLENGE_CATEGORY.ETC,
};

const LOG_SUBMISSION_NAME: Record<string, CHALLENGE_LOG_SUBMISSION_STATUS> = {
  'not-started': CHALLENGE_LOG_SUBMISSION_STATUS.NOT_STARTED,
  'progress': CHALLENGE_LOG_SUBMISSION_STATUS.IN_PROGRESS,
  'submit': CHALLENGE_LOG_SUBMISSION_STATUS.ALL_LOGS_SUBMITTED,
  'failed': CHALLENGE_LOG_SUBMISSION_STATUS.SUBMISSION_FAILED,
};

export { ALL_TAB, LOG_SUBMISSION_NAME, MARKET_TAB_MENU, PRINCIPAL_TAB_MENU, PUBLIC_CATEGORY_NAME, PUBLIC_MENU, STUDENT_TAB_MENU, SUBMISSION_STATU_MENU };
