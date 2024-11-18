import { CHALLENGE_CATEGORY } from '@/shared/enums/challenge';

export interface ITabMenu {
  tab: string;
  text: string;
}

const PRINCIPAL_TAB_MENU = [
  { tab: 'challenge', text: '챌린지' },
  { tab: 'student', text: '학생' },
  { tab: 'statistics', text: '통계' },
];

const STUDENT_TAB_MENU = [
  { tab: 'create', text: '챌린지' },
  { tab: 'my-challenge', text: 'MY 챌린지' },
];

const MARKET_TAB_MENU = [
  { tab: 'crabit', text: '크래빗 공식' },
  { tab: 'academy', text: '학원 챌린지' },
];

const DASHBOARD_MENU = [
  {
    tab: 'crabit',
    text: '크래빗 공개',
  },
  {
    tab: 'public',
    text: '우리 학원 공개',
  },
  {
    tab: 'private',
    text: '비공개 챌린지',
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

export { DASHBOARD_MENU, MARKET_TAB_MENU, PRINCIPAL_TAB_MENU, PUBLIC_CATEGORY_NAME, PUBLIC_MENU, STUDENT_TAB_MENU };
