import React from 'react';

import EmailForm from '@/app/profile/components/EmailForm';
import Flex from '@/shared/components/Flex';

function PasswordPage() {
  return (
    <Flex rowColumn="center" className="w-full py-20">
      <EmailForm />
    </Flex>
  );
}
export default PasswordPage;
