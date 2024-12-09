'use client';

import React from 'react';

import ProfileEdit from '@/app/profile/components/ProfileEdit';
import Flex from '@/shared/components/Flex';

function ProfilePage() {
  return (
    <Flex column="start" className="w-full py-5">
      <ProfileEdit />
    </Flex>
  );
}
export default ProfilePage;
