import React from 'react';

import Flex from '@/shared/components/Flex';

interface IChallengeMenuProps {
  label: string;
}

function ChallengeMenu({ label }: IChallengeMenuProps) {
  return (
    <Flex
      as="li"
      className="min-w-28 max-w-52 cursor-pointer justify-start rounded-lg bg-white px-4 py-2 hover:bg-main-deep-pink hover:font-medium hover:text-white md:min-w-40"
    >
      <p className="truncate break-keep text-xs md:text-sm"># {label}</p>
    </Flex>
  );
}
export default ChallengeMenu;
