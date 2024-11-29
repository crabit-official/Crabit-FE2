import Image from 'next/image';

import StateLabel from '@/features/academy/(workspace)/components/state-label';
import Avatar from '@/shared/components/Avatar';
import BoxContainer from '@/shared/components/BoxContainer';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { formatNumberWithCommas } from '@/shared/utils/number';

interface IProfileCardProps {
  description?: string;
  name: string;
  nickname: string;
  onClick?: () => void;
  point?: number;
  profileImageUrl?: string;
  school?: string;
}

function ProfileCard({ name, nickname, description, point, school, profileImageUrl, onClick }: IProfileCardProps) {
  return (
    <Flex
      onClick={onClick}
      rowColumn="between"
      className="h-[280px] w-full cursor-pointer gap-5 rounded-xl border border-solid border-gray-200 px-4 py-7 shadow-custom transition duration-500 hover:shadow-hover-custom"
    >
      <Flex rowColumn="center" className="gap-3">
        {profileImageUrl ? <Image src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profileImageUrl}`} alt="image" className="size-10" /> : <Avatar size="md" />}
        <Flex rowColumn="center" className="gap-1">
          <StateLabel label={name} />
          {school && (
            <Typography size="h7" className="font-normal opacity-80">
              {nickname} • {school}
            </Typography>
          )}
        </Flex>
      </Flex>
      <BoxContainer variant="border" className="relative h-28 w-full gap-1">
        {point && <StateLabel label={`Ⓟ ${formatNumberWithCommas(point)}`} variant="yellow" className="absolute right-[-10px] top-[-10px] rounded-full" />}
        <Typography size="h7" className="font-medium opacity-80">
          추가 설명
        </Typography>
        <Typography size="h7" className="font-normal opacity-80">
          {description || '-'}
        </Typography>
      </BoxContainer>
    </Flex>
  );
}
export default ProfileCard;
