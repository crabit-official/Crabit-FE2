import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function RowCard() {
  return (
    <Flex
      row="between"
      className="w-full max-w-[1000px] cursor-pointer rounded-2xl bg-white p-2 shadow-[0_12px_18px_-6px_rgba(0,0,0,0.12)] hover:scale-105 hover:bg-zinc-100"
    >
      <div className="mr-3 cursor-pointer rounded-2xl bg-white p-1 shadow-[0_12px_20px_-6px_rgba(0,0,0,0.15)]">
        <Image src="/images/logo_app.png" alt="로고" width={40} height={40} />
      </div>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Flex column="center" className="hidden md:flex">
          <Typography color="main-black" size="h4">
            TRAV_WEAR
          </Typography>
          <Typography size="h5-2">TRAV_WEAR</Typography>
        </Flex>
        <Flex column="center" className="flex-1">
          <Typography color="main-black" className="font-roboto" size="h4">
            TRAV_WEAR
          </Typography>
          <Typography className="font-roboto" size="h5-2">
            TRAV_WEAR
          </Typography>
        </Flex>
        <Flex column="center" className="hidden flex-1 lg:flex">
          <Typography color="main-black" className="font-roboto" size="h4">
            123
          </Typography>
          <Typography className="font-roboto" size="h5-2">
            123
          </Typography>
        </Flex>
      </div>
    </Flex>
  );
}

export default RowCard;
