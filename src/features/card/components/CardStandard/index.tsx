import Image from 'next/image';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function CardStandard() {
  return (
    <Flex column="start" className="w-full gap-10">
      <Flex column="start" className="gap-2">
        <StateLabel label="주의사항" className="w-fit" />
        <Typography size="h2">디자인 규격 및 주의사항</Typography>
      </Flex>
      <Flex rowColumn="center" className="rounded-xl border border-solid border-gray-100 bg-[#fafafa] px-4 py-10">
        <Flex column="start" className="gap-10">
          <Flex column="start" className="w-full gap-4 text-sm sm:text-base">
            <Typography size="h4" className="text-h5 sm:text-h4">
              ▸ 가로 85.6mm * 세로 53.98mm
            </Typography>
            <p className="leading-5">
              미리캔버스 등의 디자인 사이트를 통해 제작할 경우, 화질을 위해 규격 비율보다 <strong className="font-semibold">x 10</strong>하여 작업해 주세요.
              <br />( mm의 경우: 860 * 540 mm | px의 경우: 3250 * 2041 px )
            </p>
            <p className="leading-5">
              <strong className="font-semibold">IC칩 위치</strong> 등과 같은 디테일은 아래 이미지 참고 부탁드립니다.
              <br />
              <strong className="font-semibold">뒷면</strong>은 QR코드, 카드번호 등 중요 내용이 담겨있기 때문에
              <strong className="font-semibold">디자인이 불가능</strong>합니다.
            </p>
          </Flex>
          <Image src="/images/card_info.webp" alt="card standard" width={1000} height={1000} className="rounded-xl" />
        </Flex>
      </Flex>
    </Flex>
  );
}
export default CardStandard;
