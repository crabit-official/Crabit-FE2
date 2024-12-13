'use client';

import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import ChallengeBox from '@/features/challenge/components/ChallengeBox';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_LIST } from '@/shared/constants/challenge';

function CrabitChallengePage() {
  return (
    <Flex column="start" className="w-full gap-24 py-20">
      <motion.div
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          ease: 'easeOut',
          duration: 1.5,
        }}
        className="flex items-center justify-between gap-10 px-10 md:justify-between md:px-20 xl:px-40"
      >
        <Flex column="start" className="gap-10">
          <Flex column="start" className="gap-2">
            <Typography size="h4" className="text-h5 text-main-deep-pink sm:text-h4">
              매일 작은 성취를 통한 습관 형성
            </Typography>
            <Typography size="h1" className="text-3xl font-bold sm:text-6xl">
              크래빗 챌린지
            </Typography>
          </Flex>
          <Flex column="start" className="gap-8">
            <Flex column="start" className="gap-1 rounded-xl border border-solid border-gray-200 bg-[#fafafa] p-5 md:border-none md:bg-transparent md:p-0">
              <Typography size="h3" className="break-keep font-bold">
                매일 소소한 습관 챌린지 부터, 교과연계 활동까지!
              </Typography>
              <Typography size="h5" as="p" className="break-keep text-h6 font-normal text-gray-700 sm:text-h5">
                입시라는 장기적인 목표가 아닌, 단기적인 목표 기반의 활동에 꾸준히 참여하며 <br /> 성취감을 더욱 자주 느끼도록 지원합니다.
              </Typography>
            </Flex>
            <Flex column="start" className="gap-1 rounded-xl border border-solid border-gray-200 bg-[#fafafa] p-5 md:border-none md:bg-transparent md:p-0">
              <Typography size="h3" className="break-keep font-bold">
                건강하고 지속 가능한 습관 형성
              </Typography>
              <Typography size="h5" as="p" className="text-h6 font-normal text-gray-700 sm:text-h5">
                학생의 습관은 학생의 정체성과 연결됩니다.
              </Typography>
            </Flex>
          </Flex>
        </Flex>
        <Image src="/images/logo/logo_challenge.webp" alt="logo" width={500} height={500} className="hidden object-contain md:block" />
      </motion.div>
      <Flex rowColumn="center" className="w-full gap-10 bg-[#fafafa] px-10 py-20 md:px-20">
        <Flex className="w-full max-w-screen-xl flex-wrap gap-4">
          <Typography size="h2" className="w-full pb-5 text-start font-bold">
            다음과 같은 챌린지를 제공해요
          </Typography>
          {CHALLENGE_LIST.map((item) => (
            <ChallengeBox {...item} key={item.id} />
          ))}
        </Flex>
        <Flex />
        <Flex row="end" className="w-full">
          <div className="peer flex cursor-pointer items-center gap-1 text-gray-600 hover:text-main-deep-pink">
            <Link href="/pricing">더 알아보기</Link>
            <IoIosArrowForward />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CrabitChallengePage;
