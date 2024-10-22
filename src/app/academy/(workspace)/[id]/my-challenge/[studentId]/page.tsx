import ChallengeCard from '@/features/academy/(workspace)/components/challenge-card';
import Flex from '@/shared/components/Flex';

export default function MyChallengePage() {
  return (
    <Flex rowColumn="center" className="gap-4 px-4 pt-14">
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </Flex>
  );
}
