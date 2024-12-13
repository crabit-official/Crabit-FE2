export type TCardInfo = {
  contents: { content: string }[];
  id: number;
  title: string;
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

export { CARD_INFO };
