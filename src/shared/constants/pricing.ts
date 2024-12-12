const PRICING = [
  {
    id: 1,
    title: '스타터',
    subTitle: '무료',
    price: '0 원',
    contents: [{ content: '최대 25명의 학생 초대 가능' }, { content: '최대 3개 챌린지 생성 가능' }],
  },
  {
    id: 2,
    title: '베이직',
    subTitle: '/ 월',
    price: '29,000 원',
    contents: [
      { content: '최대 100명의 학생 초대 가능' },
      { content: '최대 3명 관리자 초대 가능' },
      { content: '무제한 챌린지 생성' },
      { content: '최대 10개 녹음 챌린지 생성 가능' },
      { content: '챌린지 마켓 이용' },
    ],
  },
  {
    id: 3,
    title: '스탠다드',
    subTitle: '/ 월',
    price: '59,000원',
    contents: [
      { content: '베이직 플랜의 모든 기능', highlight: true },
      { content: '최대 200명의 학생 초대 가능' },
      { content: '최대 4명 관리자 초대 가능' },
      { content: '무제한 녹음 챌린지 생성' },
    ],
  },
  {
    id: 4,
    title: '프리미엄',
    subTitle: '/ 월',
    price: '100,000원',
    contents: [{ content: '스탠다드 플랜의 모든 기능', highlight: true }, { content: '최대 300명의 학생 초대 가능' }, { content: '최대 5명 관리자 초대 가능' }],
  },
  {
    id: 5,
    title: '엔터프라이즈',
    subTitle: '/ 월',
    price: '가격문의',
    contents: [{ content: '프리미엄 플랜의 모든 기능', highlight: true }, { content: '학생 인원 맞춤 제공' }, { content: '관리자 인원 맞춤 제공' }],
  },
];

export { PRICING };
