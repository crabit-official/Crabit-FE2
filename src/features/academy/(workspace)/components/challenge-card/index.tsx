import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

const imgUrl =
  'https://plus.unsplash.com/premium_photo-1681396937086-8a28edd8d257?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpdGFyfGVufDB8fDB8fHww';

function ChallengeCard() {
  return (
    <Flex
      column="between"
      className="w-full cursor-pointer gap-4 rounded-lg bg-white p-4 shadow-transparent transition-all duration-200 hover:shadow-lg md:w-3/5"
    >
      <Image alt="이미지 설명" className="h-44 w-full shrink-0 rounded-lg bg-[#131315] object-contain" width={100} height={100} src={imgUrl} />
      <Flex column="start" className="w-full gap-4 py-1">
        <Typography size="h5" className="text-sm">
          어찌구 저찌구 챌린지
        </Typography>
      </Flex>
    </Flex>
  );
}

export default ChallengeCard;
