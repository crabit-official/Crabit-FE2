import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function Footer() {
  return (
    <footer className="w-full bg-black p-6 text-white sm:px-10">
      <Flex column="between" className="h-full gap-4">
        <Image src="/images/logo_dark.png" alt="logo" width={50} height={20} />
        <Flex column="start" className="gap-1">
          <Typography size="h5" as="p" className="break-keep text-xs text-white">
            대표자 : 김현지 | 소재지: 서울특별시 금천구 독산동 331-28
          </Typography>
          <Typography size="h5" as="p" className="text-xs text-white">
            사업자 등록번호 : 817-19-02261
          </Typography>
        </Flex>
        <Typography size="h5" as="p" className="text-xs text-white">
          craftyourhabit@gmail.com
        </Typography>
        <p className="text-xs text-neutral-500">@2024 CRABIT. All rights reserved.</p>
      </Flex>
    </footer>
  );
}

export default Footer;
