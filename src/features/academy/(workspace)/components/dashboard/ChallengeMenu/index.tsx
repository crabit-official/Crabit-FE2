import React from 'react';

import Flex from '@/shared/components/Flex';

interface IChallengeMenuProps {
  label: string;
}

function ChallengeMenu({ label }: IChallengeMenuProps) {
  return (
    <Flex className="min-w-32 max-w-52 cursor-pointer justify-start rounded-xl border-[0.5px] border-solid border-neutral-200 px-4 py-2 hover:border-main-pink hover:bg-main-pink hover:font-medium hover:text-white md:min-w-40">
      <p className="truncate break-keep text-xs md:text-sm"># {label}</p>
    </Flex>
  );
}
export default ChallengeMenu;
