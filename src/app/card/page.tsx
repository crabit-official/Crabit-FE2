'use client';

import CardApply from '@/features/card/components/CardApply';
import CardInfo from '@/features/card/components/CardInfo';
import CardQuestion from '@/features/card/components/CardQuestion';
import Flex from '@/shared/components/Flex';

function CrabitCardPage() {
  return (
    <Flex column="start" className="gap-10">
      <CardInfo />
      <CardApply />
      <CardQuestion />
    </Flex>
  );
}

export default CrabitCardPage;
