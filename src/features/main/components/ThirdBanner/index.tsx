import Image from 'next/image';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function ThirdBanner() {
  return (
    <Flex className="relative size-full overflow-hidden bg-gray-50 p-8 pr-0 sm:pl-16">
      <Image src="/images/logo_nsc.webp" alt="nsc logo" width={500} height={500} className="absolute right-[-120px] top-0 h-full object-contain" />
      <Flex column="center" className="z-10 w-full gap-16">
        <Flex column="center" className="gap-2">
          <Typography size="h5" className="text-sm font-medium text-blue-200 sm:text-base sm:font-bold">
            크래빗 X 한국NCS자격개발원
          </Typography>
          <Typography size="h2" className="whitespace-pre-wrap text-lg font-bold sm:text-2xl sm:font-extrabold">
            {`크래빗 추천 자격증 과정\nNCS자격개발원과 지금 시작해 보세요`}
          </Typography>
        </Flex>
        <div className="w-32 sm:w-36">
          <Button variant="outline" className="rounded-4xl bg-black text-xs font-medium text-white sm:text-base sm:font-bold">
            지금 수강하기
          </Button>
        </div>
      </Flex>
    </Flex>
  );
}

export default ThirdBanner;
