import React from 'react';

import EmailForm from '@/app/profile/components/EmailForm';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

function PasswordPage() {
  return (
    <Flex column="start" className="w-full gap-7 py-5">
      <Flex column="start" className="w-full gap-1">
        <Typography size="h3" className="opacity-80">
          비밀번호 수정
        </Typography>
        <Typography size="h5" as="p" className="text-xs opacity-60">
          이메일 인증 후 비밀번호를 변경할 수 있습니다
        </Typography>
      </Flex>
      <EmailForm />
    </Flex>
  );
}
export default PasswordPage;
