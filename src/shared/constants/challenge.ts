export type TChallenge = {
  content: string;
  id: number;
  image: string;
  title: string;
};

const CHALLENGE_LIST: TChallenge[] = [
  {
    id: 1,
    image: '/images/logo/logo_abc.webp',
    title: '영단어 챌린지',
    content: '하루 한 단어씩 익히며 영어 실력을 꾸준히 키워보세요',
  },
  {
    id: 2,
    image: '/images/logo/logo_book.webp',
    title: '필사 챌린지',
    content: '작은 한 줄의 지혜로 여러분의 하루를 새롭게 바꿔보세요',
  },
  {
    id: 3,
    image: '/images/logo/logo_money.webp',
    title: '경제 용어 챌린지',
    content: '쉽고 간단한 경제 용어를 매일 배워가며 세상의 흐름을 이해해보세요',
  },
  {
    id: 4,
    image: '/images/logo/logo_write.webp',
    title: '감사일기 챌린지',
    content: '매일 감사한 일을 기록하며 긍정적인 에너지를 채워보세요',
  },
  {
    id: 5,
    image: '/images/logo/logo_clock.webp',
    title: '미라클모닝 챌린지',
    content: '매일 아침 일찍 일어나 하루를 계획하며 새로운 습관을 만들어보세요',
  },
  {
    id: 6,
    image: '/images/logo/logo_school.webp',
    title: '교과 연계 필독서 챌린지',
    content: '교과 과정과 연계된 필독서를 읽으며 지식의 폭을 넓혀보세요',
  },
  {
    id: 7,
    image: '/images/logo/logo_idea.webp',
    title: '과학용어 100선 챌린지',
    content: '매일 하나씩 과학 용어를 익히며 과학적 사고를 길러보세요',
  },
  {
    id: 8,
    image: '/images/logo_goal.webp',
    title: 'And More...',
    content: '직접 자신의 기관이나 목표에 맞는 맞춤형 챌린지를 만들어보세요',
  },
];

export { CHALLENGE_LIST };
