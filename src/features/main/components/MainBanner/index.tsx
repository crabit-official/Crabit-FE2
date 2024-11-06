import Image from 'next/image';

import MainCard from '@/features/main/components/MainCard';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import { MAIN_CARDS } from '@/shared/constants/main-cards';

function MainBanner() {
  return (
    <Flex rowColumn="around" className="relative h-[500px] w-full gap-4 bg-gray-50 md:h-[690px] md:pb-0">
      <Image
        src="/images/banner_background.webp"
        alt="background"
        width={650}
        height={700}
        className="absolute h-[500px] w-[2000px] object-cover md:h-[690px]"
      />
      <div className="h-14" />
      <Framer className="z-10 flex flex-col items-center justify-center gap-4" duration={0.5} location="top">
        <Typography size="h0" className="text-3xl font-bold text-white sm:font-extrabold md:text-6xl">
          학습 습관 형성의 출발점
        </Typography>
        <Flex rowColumn="center" className="text-base font-medium text-white sm:text-lg md:text-2xl">
          <p>{`Crabit은 'Craft Your Habit'의 합성어로,`}</p>
          <p>지속가능한 학습 습관을 형성할 수 있도록 지원합니다</p>
        </Flex>
      </Framer>
      <Framer className="z-10 flex overflow-hidden rounded-xl text-white">
        {MAIN_CARDS.map((e) => (
          <MainCard {...e} key={e.id} />
        ))}
      </Framer>
    </Flex>
  );
}

export default MainBanner;
