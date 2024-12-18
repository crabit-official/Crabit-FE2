import type { Ref } from 'react';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import CardInfoBox from '@/features/card/components/CardInfoBox';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { CARD_INFO } from '@/shared/constants/card';

interface ICardInfoProps {
  title: string;
}

function CardInfo({ title }: ICardInfoProps, ref: Ref<HTMLDivElement>) {
  return (
    <Flex column="start" className="w-full gap-24 py-20">
      <motion.div
        ref={ref}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          ease: 'easeOut',
          duration: 1.5,
        }}
        className="relative flex items-center justify-between gap-10 px-10 md:justify-between md:px-20 xl:px-40"
      >
        <Flex column="start" className="w-full gap-10 sm:w-fit">
          <Typography size="h1" className="text-3xl font-bold text-main-deep-pink md:text-6xl">
            {title}
          </Typography>
          <Flex column="start" className="gap-2 rounded-xl border border-solid border-gray-200 bg-[#fafafa] p-5 md:border-none md:bg-transparent md:p-0">
            <Typography size="h2" className="text-h4 font-bold sm:break-keep sm:text-h2">
              우리 학원, 학교만의 장학카드를 제작하여 <br /> 학생들에게 동기를 부여해 주는 장학 시스템입니다.
            </Typography>
            <Typography size="h4" className="text-h6 font-normal text-gray-700 sm:text-h4">
              <strong className="font-bold text-main-black">무기명 선불카드</strong>로 <strong className="font-bold text-main-black">전국 어디서든</strong>
              결제가 가능하며, <br /> <strong className="font-bold text-main-black">교통카드</strong> 기능을 탑제할 수 있습니다
            </Typography>
            <p className="text-xs opacity-60 sm:text-sm">(* 비교통 카드와 금액 상이)</p>
          </Flex>
        </Flex>
        <Image
          src="/images/logo/logo_card.webp"
          alt="logo"
          width={600}
          height={600}
          className="absolute right-0 top-[-50px] z-[-1] hidden object-contain sm:block sm:w-96 md:w-[600px]"
        />
      </motion.div>
      <Flex rowColumn="center" className="hidden bg-[#fafafa] py-10 sm:flex">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/K3uEYB5oe2M?si=6_TvWoPu2l8dPA0m?autoplay=1&loop=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Flex>
      <div className="flex flex-col justify-start gap-10 px-10 md:px-20 xl:px-40">
        <Typography size="h2" className="break-keep font-bold">
          크래빗 장학카드, 이렇게 활용해요 !
        </Typography>
        <Flex column="start" className="gap-4">
          {CARD_INFO.map((item) => (
            <CardInfoBox key={item.id} {...item} />
          ))}
        </Flex>
      </div>
    </Flex>
  );
}
export default forwardRef<HTMLDivElement, ICardInfoProps>(CardInfo);
