const CHALLENGE_CARDS = [
  {
    id: 1,
    title: '성취감',
    content: '챌린지 기능을 통해 매일 소소한 성취감을 선물합니다.',
    image: '/images/logo/logo_accomplishment.webp',
  },
  {
    id: 2,
    title: '습관 형성',
    content: '꾸준한 성취감은 학생들의 습관을 형성하고 이는 학생들의 자신감이 되고 정체성이 됩니다.',
    image: '/images/logo_calendar.webp',
  },
  {
    id: 3,
    title: '우리 ( ) 만의 챌린지',
    content: '챌린지 생성 기능을 활용해 우리 학원만의, 우리 학교만의, 우리 커뮤니티만의 챌린지를 쉽게 제작 관리할 수 있습니다.',
    image: '/images/logo_goal.webp',
  },
];

const SCHOLARSHIP_CARDS = [
  {
    id: 1,
    title: '요즘 대세는 포인트가 아니라 돈으로!',
    contents: [
      {
        id: 1,
        title: '전국 어디서든 사용가능한 선불카드',
      },
      {
        id: 2,
        title: '청소년 교통카드 기능 가능',
      },
    ],
    position: 'left',
  },
  {
    id: 2,
    title: '커스터마이징 디자인',
    contents: [
      {
        id: 1,
        title: '로고 슬로건이 담긴 디자인으로 학생들에게는 소속감을, 기관에게는 새로운 마케팅 전략을 선물합니다.',
      },
    ],
    position: 'right',
  },
];

const MAIN_CARDS = [
  { content: '스스로를 디자인하는 학습 습관', id: 1, title: 'Design' },
  { content: '매일 선물받는 성취감', id: 2, title: 'Achievement' },
  { content: '자기효능감 향상', id: 3, title: 'Self-efficacy' },
];

export { CHALLENGE_CARDS, MAIN_CARDS, SCHOLARSHIP_CARDS };
