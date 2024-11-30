import React from 'react';

import Flex from '@/shared/components/Flex';

function AcademySettingBoardPage({ params }: { params: { id: string } }) {
  return <AcademyProfileForm academyId={Number(params.id)} />;
}

export default AcademySettingBoardPage;
