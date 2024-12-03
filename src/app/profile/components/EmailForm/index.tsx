'use client';

import React from 'react';

import PasswordForm from '@/app/profile/components/PasswordForm';
import BoxContainer from '@/shared/components/BoxContainer';
import Framer from '@/shared/components/Framer';

function EmailForm() {
  return (
    <BoxContainer variant="border" className="gap-4 py-10">
      <Framer>
        <PasswordForm />
      </Framer>
    </BoxContainer>
  );
}

export default EmailForm;
