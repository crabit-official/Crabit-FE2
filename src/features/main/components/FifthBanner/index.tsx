'use client';

import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';

import SwiperComponent from '@/features/main/components/Swiper';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { ACADEMY_LOGO } from '@/shared/constants/academy_logo';

function FifthBanner() {
  return (
    <Flex rowColumn="center" className="w-full bg-gray-50 px-4 py-16">
      <Flex rowColumn="center" className="gap-3 sm:gap-4">
        <Typography as="p" size="h5" className="text-sm font-medium text-main-deep-pink sm:text-base sm:font-bold">
          with 크래빗
        </Typography>
        <Flex column="center">
          <Typography size="h0" className="whitespace-pre-wrap px-1 text-center text-base font-bold sm:px-0 sm:text-lg md:text-2xl">
            현재 300개 이상의 학원, 학교 및 교육기관에서
          </Typography>
          <Typography size="h0" className="whitespace-pre-wrap px-1 text-center text-base font-bold sm:px-0 sm:text-lg md:text-2xl">
            학생 습관형성을 위해 크래빗을 도입하고 계십니다.
          </Typography>
        </Flex>
      </Flex>
      <Flex className="w-full pt-10">
        <SwiperComponent>
          {ACADEMY_LOGO.map((academy, idx) => (
            <SwiperSlide key={idx}>
              <Image src={academy.imageUrl} alt="academy logo" width={100} height={100} />
            </SwiperSlide>
          ))}
        </SwiperComponent>
      </Flex>
    </Flex>
  );
}

export default FifthBanner;
