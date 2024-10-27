import Image from 'next/image';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import {
  getApprovalStatus,
  getChallengeCategory,
  getChallengeType,
  getStatusName,
  getVariantByStatus,
} from '@/features/academy/(workspace)/utils/challengeState';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IMyChallengeProgressResult } from '@/shared/types/acadmy';
import formatDate from '@/shared/utils/date';

type ReleasedChallengeType = IMyChallengeProgressResult['result']['releasedChallenge'];
type StudentChallengeType = IMyChallengeProgressResult['result']['studentChallenge'];

interface IStudentChallengeDetailProps {
  releasedChallenge: ReleasedChallengeType;
  studentChallenge: StudentChallengeType;
}

function StudentChallengeDetail({ releasedChallenge, studentChallenge }: IStudentChallengeDetailProps) {
  return (
    <>
      {releasedChallenge?.thumbnailImageUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${releasedChallenge.thumbnailImageUrl}`}
          alt="challenge thumnailImage"
          width={500}
          height={500}
          className="h-48 w-full rounded-2xl bg-black object-contain"
        />
      )}
      <Flex column="start" className="gap-2">
        <Typography size="h2">
          {releasedChallenge?.challengeCoreCreatorAcademyName}의 {releasedChallenge?.title}
        </Typography>
        <Flex row="start" className="gap-1">
          <StateLabel label={getChallengeType(releasedChallenge.challengeType)} variant={getVariantByStatus(releasedChallenge.challengeType)} />
          <StateLabel label={getChallengeCategory(releasedChallenge.challengeCategory)} variant={getVariantByStatus(releasedChallenge.challengeCategory)} />
        </Flex>
      </Flex>

      <Flex column="center">
        <Typography size="h5" as="p" className="font-normal">
          {releasedChallenge?.content}
        </Typography>
        <Typography size="h5" as="p" className="font-normal text-neutral-400">
          DAY {releasedChallenge?.totalDays} | Ⓟ {releasedChallenge?.points}
        </Typography>
      </Flex>
      <hr className="h-2 w-full text-neutral-400" />
      <Flex column="center" className="gap-1">
        <Typography size="h2">📚 나의 챌린지 진행도</Typography>
        <Flex row="start" className="gap-1">
          <Typography size="h5" as="p" className="text-sm font-medium text-neutral-500">
            {formatDate(studentChallenge.startedAt)}
          </Typography>
          <p className="text-sm text-neutral-400">~</p>
          <Typography size="h5" as="p" className="text-sm font-medium text-neutral-500">
            {formatDate(studentChallenge.endedAt)}
          </Typography>
        </Flex>
        <Flex column="start">
          <Typography size="h5" as="p" className="text-sm font-medium">
            제출 상태 : {getStatusName(studentChallenge.challengeLogSubmissionStatus)}
          </Typography>
          <Typography size="h5" as="p" className="text-sm font-medium">
            승인 상태 : {getApprovalStatus(studentChallenge.challengeLogApprovalStatus)}
          </Typography>
          <Typography size="h5" as="p" className="text-sm font-medium">
            오늘 챌린지 제출 상태 : {studentChallenge.hasTodayChallengeLog ? '완료' : '미완'}
          </Typography>
        </Flex>
      </Flex>
    </>
  );
}

export default StudentChallengeDetail;
