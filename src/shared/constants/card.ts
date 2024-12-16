export type TCardInfo = {
  contents: { content: string }[];
  id: number;
  title: string;
};

export type TCardApply = {
  content: string;
  sub?: string;
};

const CARD_INFO: TCardInfo[] = [
  {
    id: 1,
    title: `우리 학원, 우리 회사의\n로고 및 브랜드 디자인 반영`,
    contents: [
      { content: '학생들은 소속감 UP!' },
      { content: '학원, 학교, 교육기관은 외부 마케팅을 통한 효과 UP!' },
      { content: '내가 공부하며 번 돈으로 사먹는 떡볶이? 학생들의 경제 관념 UP!' },
    ],
  },
  {
    id: 2,
    title: `충전 방법`,
    contents: [
      { content: '구매 대표자에게 전달되는 어드민 사이트와 계정을 통한 배포 및 충전 기능' },
      { content: '카드 뒷면 QR코드를 통해 부모님이나 학생 본인이 충전 가능' },
      { content: '해외/국내 카드, 편의점 충전, ATM 현금 충전, 휴대폰 소액 결제, 가상계좌 입금 가능' },
    ],
  },
  {
    id: 3,
    title: `사용처 예시`,
    contents: [
      { content: '카드결제가 되는 전국 대부분의 매장에서 사용 가능' },
      { content: '편의점, 다이소, PC방, 분식집, 코인노래방, 카페, 서점, 문구점, 마트 등...' },
    ],
  },
];

const CARD_APPLY1: TCardApply[] = [
  { content: '❶ 카드 디자인하기' },
  { content: '❷ 디자인 파일, 사업자등록증 준비하여 신청폼 작성' },
  { content: '❸ 주문한 수량에 알맞은 금액 입금' },
  { content: '❹ 담당자 > 구매 대표자에게 연락' },
  { content: '❺ 디자인 샘플 작업' },
  { content: '❻ 구매 대표자의 컨펌 후 제작 진행' },
];

const CARD_APPLY2: TCardApply[] = [
  {
    content: '❽ 전자계약서 서명',
    sub: '카드 관리용 어드민 페이지 계정에 발급되려면 전자 계약서가 필수 입니다. 계정 발금이 지연되지 않기 위해, 이메일로 전달되는 전자계약서 확인 후 서명 부탁드립니다.',
  },
  { content: '❾ 장학 카드 수령' },
  { content: '❿ 어드민 사이트를 통해 카드 배포 및 예치금 충전 & 카드 충전' },
  { content: '⓫ 학생들에게 배부' },
];

export { CARD_APPLY1, CARD_APPLY2, CARD_INFO };
