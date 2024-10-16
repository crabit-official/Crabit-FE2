import FifthBanner from '@/features/main/components/FifthBanner';
import FourthBanner from '@/features/main/components/FourthBanner';
import MainBanner from '@/features/main/components/MainBanner';
import ThirdBanner from '@/features/main/components/ThirdBanner';
import SecondBanner from '@/features/main/SecondBanner';
import Flex from '@/shared/components/Flex';

function Home() {
  return (
    <Flex column="center" className="gap-16">
      <MainBanner />
      <SecondBanner />
      <ThirdBanner />
      <FourthBanner />
      <FifthBanner />
    </Flex>
  );
}

export default Home;
