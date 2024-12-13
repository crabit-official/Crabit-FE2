import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';
import type { TChallenge } from '@/shared/constants/challenge';

function ChallengeBox({ title, content, image, id }: TChallenge) {
  return (
    <Framer
      duration={0.2 * id}
      className={`flex h-72 w-full flex-col gap-6 rounded-2xl border border-solid border-gray-200 bg-white px-8 py-9 shadow-custom md:w-64 ${id % 2 === 0 ? 'mt-0 md:mt-16' : 'mt-0'} `}
    >
      <Image src={image} alt="logo" width={60} height={60} className="size-[60px] object-contain" />
      <Flex column="start" className="gap-2">
        <Typography size="h3" className="font-bold">
          {title}
        </Typography>
        <Typography size="h5" className="font-normal text-gray-600">
          {content}
        </Typography>
      </Flex>
    </Framer>
  );
}
export default ChallengeBox;
