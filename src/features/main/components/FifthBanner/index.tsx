import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function FifthBanner() {
  return (
    <Flex rowColumn="center" className="w-full bg-neutral-50 px-4 py-16">
      <Flex rowColumn="center" className="gap-4">
        <Typography as="p" size="h5" className="font-bold text-main-pink">
          with 크래빗
        </Typography>
        <Typography
          size="h0"
          className="whitespace-pre-wrap text-center text-lg font-extrabold md:text-2xl"
        >{`현재 200개 이상의 학원, 학교 및 교육기관에서\n학생 습관형성을 위해 크래빗을 도입하고 계십니다.`}</Typography>
      </Flex>
    </Flex>
  );
}

export default FifthBanner;
