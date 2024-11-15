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
  { tab: 'friend', text: '칭구들 이름 챌린진데 뭐라하지' },
];

const MARKET_TAB_MENU = [
  { tab: 'crabit', text: '크래빗 공식' },
  { tab: 'academy', text: '학원 챌린지' },
];

export { MARKET_TAB_MENU, PRINCIPAL_TAB_MENU, STUDENT_TAB_MENU };
