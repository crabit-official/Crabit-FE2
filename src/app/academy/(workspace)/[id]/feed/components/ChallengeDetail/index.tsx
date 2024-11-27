import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { TChallengeDetailResult } from '@/shared/types/acadmy';
import formatDate from '@/shared/utils/date';

function ChallengeDetail({ studentAcademyProfile, studentChallengeLog }: TChallengeDetailResult['result']) {
  return (
    <Flex column="center" className="w-full gap-4">
      <Flex row="start" className="items-center">
        {studentAcademyProfile.academyProfileImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${studentAcademyProfile.academyProfileImageUrl}`}
            alt="profile"
            width={50}
            height={50}
            className="size-[30px] rounded-full border border-solid border-gray-100"
          />
        ) : (
          <Avatar />
        )}
        <Flex row="between" className="w-full px-2">
          <Typography size="h7" className="font-normal">
            <strong className="font-semibold">{studentAcademyProfile.academyNickname}</strong> 님의 챌린지 • {formatDate(studentChallengeLog.createdAt)}
          </Typography>
        </Flex>
      </Flex>
      <hr className="h-px w-full bg-gray-100" />
      {studentChallengeLog.fileUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${studentChallengeLog.fileUrl}`}
          alt="file image"
          width={300}
          height={300}
          className="size-full rounded-lg border border-solid border-gray-100 bg-gray-50 object-contain"
        />
      )}
      <Typography size="h6" className="font-medium opacity-80">
        {studentChallengeLog.content}
      </Typography>
    </Flex>
  );
}
export default ChallengeDetail;
