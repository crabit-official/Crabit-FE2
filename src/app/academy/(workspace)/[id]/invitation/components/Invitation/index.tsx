'use client';

// import { useState } from 'react';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';

function InvitationTab() {
  // const [tab, setTab] = useState('PRINCIPAL');
  return (
    <Flex row="between">
      <Button variant="link" className="border border-gray-800">
        학생
      </Button>

      <Button variant="link" className="border-b-2 border-main-pink">
        선생님
      </Button>
    </Flex>
  );
}

export default InvitationTab;
