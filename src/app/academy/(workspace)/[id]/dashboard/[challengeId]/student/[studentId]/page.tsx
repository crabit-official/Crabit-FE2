import React from 'react';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function StudentChallengeDetail() {
  return (
    <Flex className="min-h-[600px] w-full">
      <Flex column="start" className="relative w-full gap-4 lg:w-3/5">
        <Image src="/images/icons/icon_book.webp" alt="img" width={300} height={300} className="absolute right-[-50px] top-0 hidden opacity-40 md:block" />

        <Flex row="start" className="gap-5">
          <Flex column="start">
            <Typography size="h5" as="p" className="text-blue-950">
              챌린지 현황
            </Typography>
            <Flex className="items-end gap-2">
              <Typography size="h2">안예원 학생</Typography>
              <Typography size="h5" as="p" className="py-[2px] text-sm">
                제출완료 • 승인
              </Typography>
            </Flex>
          </Flex>
        </Flex>

        <Flex rowColumn="center" className="z-10 gap-6 pt-10">
          <Flex column="start" className="w-full gap-2">
            <Typography size="h5" as="p" className="text-blue-950">
              DAY 2
            </Typography>
            <Flex column="around" className="w-full cursor-pointer gap-2 rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom">
              <Typography size="h5" as="p" className="text-sm font-medium">
                첨부 파일 : 준환이의 비빔밥 레시피.ppt
              </Typography>
              <Typography size="h5" as="p" className="text-sm font-normal opacity-80">
                내용이 들어가는 부분입니다.
              </Typography>
            </Flex>
          </Flex>
          <Flex column="start" className="w-full gap-2">
            <Typography size="h5" as="p" className="text-blue-950">
              DAY 1
            </Typography>
            <Flex column="around" className="w-full cursor-pointer gap-2 rounded-lg border border-solid border-gray-100 bg-white px-4 py-5 shadow-custom">
              <Image
                src="/images/test.jpeg"
                alt="test"
                width={480}
                height={100}
                className="h-40 w-full rounded-lg border border-solid border-gray-100 object-cover"
              />
              <Typography size="h5" as="p" className="text-sm font-normal opacity-80">
                이미지 파일을 올렸을 때, 내용이 들어가는 부분입니다.
              </Typography>
            </Flex>
          </Flex>
        </Flex>

        <Flex />
      </Flex>
    </Flex>
  );
}
export default StudentChallengeDetail;
