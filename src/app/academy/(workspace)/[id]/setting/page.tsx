import React from 'react';

import AcademyProfileForm from './components/AcademyProfileForm';

function AcademySettingBoardPage({ params }: { params: { id: string } }) {
  return <AcademyProfileForm academyId={Number(params.id)} />;
}

export default AcademySettingBoardPage;
