import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function ThirdBanner() {
  return (
    <Flex className="relative size-full min-h-[200px] overflow-hidden bg-[#F8F8F8] p-8 pr-0 sm:pl-16 md:min-h-[256px]">
      <Image
        src="/images/logo_nsc.webp"
        alt="nsc logo"
        width={500}
        height={500}
        className="absolute right-[-50px] top-0 hidden h-full w-fit object-fill md:block"
      />
      <div className="absolute inset-0 bg-[url('https://cdn.imweb.me/thumbnail/20240910/78a516cad9749.png')] bg-cover bg-center bg-no-repeat md:hidden" />
      <Flex column="start" className="z-10 w-full gap-16">
        <Flex column="center" className="gap-2">
          <Typography size="h5" className="text-sm font-bold text-blue-200 sm:text-base">
            크래빗 X 한국NCS자격개발원
          </Typography>
          <Typography size="h2" className="whitespace-pre-wrap text-lg font-bold sm:text-2xl sm:font-extrabold">
            {`크래빗 추천 자격증 과정\nNCS자격개발원과 지금 시작해 보세요`}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ThirdBanner;
