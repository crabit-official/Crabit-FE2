import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

function LastStep() {
  return (
    <Flex rowColumn="center" className="w-full gap-10 rounded-xl p-5">
      <Framer location="top" duration={0.5}>
        <Image src="/images/icons/icon_check.webp" alt="check img" width={200} height={200} />
      </Framer>
      <Framer duration={0.5} className="flex w-full flex-col items-center justify-center">
        <Typography size="h3">챌린지를 생성중 입니다</Typography>
        <Typography size="h5" as="p" className="text-sm text-gray-400">
          잠시만 기다려주세요
        </Typography>
      </Framer>
    </Flex>
  );
}
export default LastStep;
