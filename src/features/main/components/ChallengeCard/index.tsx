import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

interface IChallengeCardProps {
  content: string;
  id: number;
  image: string;
  title: string;
}

function ChallengeCard({ title, content, image, id }: IChallengeCardProps) {
  return (
    <Framer
      duration={id * 0.5}
      className="flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl bg-black p-8 sm:h-80 sm:p-8 md:h-[400px] md:w-3/5"
    >
      <Flex column="center" className="w-full gap-2 sm:gap-8">
        <Typography size="h1" className="break-keep text-2xl font-bold text-white">
          {title}
        </Typography>
        <Typography as="p" size="h5" className="w-full break-keep text-sm text-white sm:w-2/3 md:w-full">
          {content}
        </Typography>
      </Flex>
      <Flex row="end" className="w-full md:justify-center">
        <Image src={image} alt="challenge_logo" width={157} height={100} className="w-28 object-contain md:w-[140px]" />
      </Flex>
    </Framer>
  );
}

export default ChallengeCard;
