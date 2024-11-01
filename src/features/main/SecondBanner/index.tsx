'use client';

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
          <Typography size="h3" className="text-base font-bold text-main-pink sm:text-lg md:text-xl">
            매일의 작은 성취를 통한 습관 형성
          </Typography>
          <Typography size="h0" className="text-2xl font-bold sm:font-extrabold md:text-3xl">
            크래빗 챌린지
          </Typography>
        </Flex>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          {CHALLENGE_CARDS.map((e) => (
            <ChallengeCard {...e} key={e.id} />
          ))}
        </div>
      </Flex>
    </Container>
  );
}

export default SecondBanner;
