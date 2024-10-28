import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import type { IStudentChallengeContents } from '@/shared/types/acadmy';
import formatDate from '@/shared/utils/date';

function StudentChallengeContent({ challengeLog, studentProfile }: IStudentChallengeContents) {
  return (
    <Flex column="center" className="w-full gap-4 rounded-lg bg-white p-4 md:w-2/3">
      <Flex className="items-end gap-2" row="between">
        <Typography size="h4" className="text-main-pink">
          DAY {challengeLog.day}
        </Typography>
        <Typography size="h5" className="text-xs text-neutral-400">
          {formatDate(challengeLog.createdAt)}
        </Typography>
      </Flex>

      <Flex column="start" className="gap-2">
        {challengeLog.fileUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${challengeLog.fileUrl}`}
            alt="challenge"
            width={100}
            height={100}
            className="h-[200px] w-full rounded-lg bg-black/10 object-contain"
          />
        )}
        <Typography size="h5" className="text-sm font-normal">
          {challengeLog.content}
        </Typography>
      </Flex>

      <Flex row="end" className="items-center gap-2">
        {studentProfile.academyProfileImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${studentProfile.academyProfileImageUrl}`}
            alt="student profile image"
            width={20}
            height={20}
            className="size-5"
          />
        ) : (
          <Avatar size="xs" />
        )}
        <Typography size="h5" as="p" className="text-sm font-normal">
          {studentProfile.academyNickname}
        </Typography>
      </Flex>
    </Flex>
  );
}
export default StudentChallengeContent;
