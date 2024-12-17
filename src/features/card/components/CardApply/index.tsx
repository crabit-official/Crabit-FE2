import { FaArrowDownLong } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import { CARD_APPLY1, CARD_APPLY2 } from '@/shared/constants/card';

function CardApply() {
  return (
    <Framer className="flex w-full flex-col items-center justify-between gap-10 px-10 md:justify-between md:px-20 xl:px-40">
      <Flex column="start" className="w-full gap-2">
        <StateLabel label="카드 신청" className="w-fit" />
        <Typography size="h2">신청 & 주문 과정</Typography>
        <Flex rowColumn="center" className="mt-5 w-full gap-4">
          <ul className="flex h-64 w-full flex-col justify-center gap-3 rounded-2xl border border-solid border-gray-100 bg-[#fafafa] p-5">
            {CARD_APPLY1.map((item, idx) => (
              <li key={idx} className="text-sm md:text-base">
                {item.content}
              </li>
            ))}
          </ul>
          <Flex rowColumn="center" className="gap-3">
            <Flex rowColumn="center" className="gap-1">
              <Typography size="h5">❼ 발송</Typography>
              <Typography size="h6" className="opacity-80">
                디자인 컨펌 기준 평균 3일 이내로 제작 후 발송
              </Typography>
            </Flex>
            <FaArrowDownLong />
          </Flex>
          <ul className="flex h-64 w-full flex-col justify-center gap-5 rounded-2xl border border-solid border-gray-100 bg-[#fafafa] p-5">
            {CARD_APPLY2.map((item, idx) => (
              <li key={idx} className="flex flex-col gap-1 text-sm md:text-base">
                <p>{item.content}</p>
                {item?.sub && <p className="text-xs opacity-80 sm:text-sm">({item.sub})</p>}
              </li>
            ))}
          </ul>
        </Flex>
      </Flex>
      <Link href="/pricing" className="flex w-full items-center justify-end gap-2 px-2 opacity-80 hover:text-main-deep-pink">
        <p>가격 안내</p>
        <IoIosArrowForward />
      </Link>
      <Link
        href="https://smore.im/form/XRusYYBvZ8"
        target="_blank"
        className="rounded-4xl bg-main-deep-pink px-10 py-3 text-white transition duration-300 hover:scale-95 hover:opacity-80"
      >
        카드 신청하기
      </Link>
    </Framer>
  );
}

export default CardApply;
