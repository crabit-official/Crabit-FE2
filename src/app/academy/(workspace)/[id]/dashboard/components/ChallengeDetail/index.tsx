import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsTrash3Fill } from 'react-icons/bs';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function ChallengeDetail() {
  return (
    <Flex className="w-full">
      <Flex column="center" className="relative w-full gap-5 px-2 sm:px-0">
        <Flex column="center" className="absolute right-[-16px] top-[100px] mx-2 gap-4 rounded-xl bg-gray-100 p-4 sm:mx-0">
          <button type="button">
            <AiTwotoneEdit className="hover:text-main-deep-pink" />
          </button>
          <button type="button">
            <BsTrash3Fill className="hover:text-main-deep-pink" />
          </button>
        </Flex>
        <Flex column="center" className="gap-1">
          <Typography size="h5" className="break-keep text-main-deep-pink">
            크래빗 공식 챌린지 • 습관 챌린지
          </Typography>
          <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
            감사일기 챌린지
          </Typography>
        </Flex>
        <Image
          src="/images/test.jpeg"
          alt="test"
          width={500}
          height={500}
          className="h-96 w-full rounded-2xl border border-solid border-gray-100 object-cover shadow-custom"
        />
        <Flex className="gap-4">
          <Flex column="center" className="w-full items-center gap-4 rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
            <Typography size="h3" className="w-full text-start">
              배정된 포인트
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Ⓟ 500
            </Typography>
          </Flex>
          <Flex column="center" className="w-full items-center gap-4 rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
            <Typography size="h3" className="w-full text-start">
              총 일수
            </Typography>
            <Typography size="h5" className="w-full text-end text-main-deep-pink">
              Day 20
            </Typography>
          </Flex>
        </Flex>
        <Flex className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
          <Typography size="h5" className="w-full text-start">
            첨부 파일 : [중요] 안예원의 제육덮밥 레시피.pdf
          </Typography>
        </Flex>
        <Flex className="w-full cursor-pointer items-center rounded-lg border border-solid border-gray-100 bg-gray-50 px-4 py-5">
          <Typography size="h5" className="w-full text-start font-normal opacity-80" as="p">
            진행 방법: 매일 하루를 되돌아보고, 감사했던 일을 적어보는 감사일기 챌린지에요. 이번주는 우리 가족과 나의 친구에 대해 감사한 것을 적어봅시다!
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default ChallengeDetail;
