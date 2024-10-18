import React from 'react';
import { FaMedal } from 'react-icons/fa';

import Index from '@/features/academy/(workspace)/components/dashboard/Profile';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function Trendbar() {
  return (
    <Flex className="hidden md:flex">
      <Flex column="start" className="gap-2">
        <Flex row="start">
          <Typography size="h5" className="pl-2 text-xs font-bold">
            👑 성실왕 순위
          </Typography>
        </Flex>
        <Flex column="start" className="gap-4 rounded-xl bg-white px-10 py-4">
          <Index size="sm" icon={FaMedal} />
          <Index size="sm" icon={FaMedal} />
          <Index size="sm" icon={FaMedal} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Trendbar;
