import React from 'react';
import Image from 'next/image';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function MarketChallengeDetail() {
  return (
    <Flex rowColumn="center" className="w-full gap-10 px-6 py-20 md:w-3/5 md:px-0">
      <Flex column="center" className="w-full gap-1">
        <Typography size="h5" className="break-keep text-main-deep-pink">
          크래빗 공식 챌린지 • 습관 챌린지
        </Typography>
        <Typography size="h1" className="break-keep text-3xl font-bold md:text-4xl">
          감사일기 챌린지
        </Typography>
      </Flex>
      <Flex rowColumn="center" className="gap-4">
        <Image src="/images/test.jpeg" alt="test" width={300} height={300} className="h-96 w-full rounded-2xl object-cover" />
        <Typography size="h5" as="p" className="break-keep text-base opacity-60">
          진행 방법: 매일 하루를 되돌아보고, 감사했던 일을 적어보는 감사일기 챌린지에요. 이번주는 우리 가족과 나의 친구에 대해 감사한 것을 적어봅시다!
        </Typography>
      </Flex>
      <Button className="mt-4 bg-main-deep-pink font-medium text-white">우리 학원에 배포</Button>
    </Flex>
  );
}
export default MarketChallengeDetail;
