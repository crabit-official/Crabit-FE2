import type { ReactNode } from 'react';

import BoxContainer from '@/shared/components/BoxContainer';
import Flex from '@/shared/components/Flex';

interface ILayoutProps {
  comment: ReactNode;
  detail: ReactNode;
}

function Layout({ comment, detail }: ILayoutProps) {
  return (
    <Flex rowColumn="center" className="mt-14 w-full px-4 lg:px-0">
      <BoxContainer className="w-full flex-col gap-10 px-4 py-5 lg:w-1/2">
        <article className="w-full">{detail}</article>
        <div className="w-full">{comment}</div>
      </BoxContainer>
    </Flex>
  );
}
export default Layout;
