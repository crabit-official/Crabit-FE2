import { getServerSession, type Session } from 'next-auth';

import StudentChallengeDetail from '@/app/academy/(workspace)/[id]/challenge/components/StudentChallengeDetail';
import { getMyChallengeProgress } from '@/shared/apis/challenge';
import Flex from '@/shared/components/Flex';
import { authOptions } from '@/shared/utils/authOptions';

async function StudentChallengePage({ params }: { params: { id: string; studentChallengeId: string } }) {
  const session = (await getServerSession(authOptions)) as Session;
  const challengeData = await getMyChallengeProgress({ session, academyId: Number(params.id), studentChallengeId: Number(params.studentChallengeId) });

  return (
    <Flex column="center" className="w-full max-w-[700px] gap-4 py-10">
      <StudentChallengeDetail releasedChallenge={challengeData.releasedChallenge} studentChallenge={challengeData.studentChallenge} />
    </Flex>
  );
}
export default StudentChallengePage;
