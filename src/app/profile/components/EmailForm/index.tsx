'use client';

import React from 'react';

import PasswordForm from '@/app/profile/components/PasswordForm';
import Flex from '@/shared/components/Flex';
import FramerScale from '@/shared/components/FramerScale';
import Typography from '@/shared/components/Typography';

function EmailForm() {
  return (
    <FramerScale className="flex w-full flex-col justify-start gap-5">
      <Flex column="start" className="w-full gap-1">
        <Typography size="h3" className="opacity-80">
          비밀번호 수정
        </Typography>
      </Flex>
      <PasswordForm />
    </FramerScale>
  );
}

export default EmailForm;
