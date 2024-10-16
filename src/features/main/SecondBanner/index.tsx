import ChallengeCard from '@/features/main/components/ChallengeCard';
import Container from '@/features/main/components/Container';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { CHALLENGE_CARDS } from '@/shared/constants/main-cards';

function SecondBanner() {
  return (
    <Container>
      <Flex column="center" className="gap-8 px-8 md:p-0">
        <Flex column="center" className="gap-4">
          <Typography size="h3" className="text-lg font-extrabold text-main-pink md:text-xl">
            매일의 작은 성취를 통한 습관 형성
          </Typography>
          <Typography size="h0" className="text-2xl font-extrabold md:text-3xl">
            크래빗 챌린지
          </Typography>
        </Flex>
        <Flex className="w-full flex-col gap-4 md:flex-row">
          {CHALLENGE_CARDS.map((e) => (
            <ChallengeCard {...e} key={e.id} />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}

export default SecondBanner;
