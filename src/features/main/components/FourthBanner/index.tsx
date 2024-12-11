import Container from '@/features/main/components/Container';
import ScholarshipCard from '@/features/main/components/ScholarshipCard';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { SCHOLARSHIP_CARDS } from '@/shared/constants/main-cards';

function FourthBanner() {
  return (
    <div className="w-full px-8 md:px-0">
      <Container>
        <Flex column="center" className="w-full gap-8">
          <Flex column="center" className="gap-4">
            <Typography size="h2" className="text-base font-bold text-main-deep-pink sm:text-lg md:text-2xl">
              크래빗만의 혁신적인 장학 시스템
            </Typography>
            <Typography size="h0" className="text-2xl font-bold sm:font-extrabold md:text-3xl">
              크래빗 장학카드
            </Typography>
            <Flex column="center" className="gap-2 sm:gap-0">
              <Typography size="h5" as="p" className="w-4/5 break-keep text-xs text-neutral-500 md:text-base">
                크래빗 장학카드는 학생 동기부여에 매우 효과적인 장학 시스템입니다.
              </Typography>
              <Typography size="h5" as="p" className="w-full break-keep text-xs text-neutral-500 md:text-base">
                {`현재 300개가 넘는 교육기관에서 크래빗 장학카드를 통한 "우리만의 장학 시스템"을 도입하고 계십니다.`}
              </Typography>
            </Flex>
          </Flex>

          <Flex column="center" className="w-full cursor-pointer gap-8">
            {SCHOLARSHIP_CARDS.map((e) => (
              <ScholarshipCard {...e} key={e.id} />
            ))}
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}

export default FourthBanner;
