import React from 'react';

import ProfileEditForm from '@/app/profile/components/ProfileEditForm';
import Flex from '@/shared/components/Flex';

function ProfilePage() {
  return (
    <Flex column="start" className="w-full py-5">
      <ProfileEditForm />
    </Flex>
  );
}
export default ProfilePage;
