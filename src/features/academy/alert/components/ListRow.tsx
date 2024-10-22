import React from 'react';

import Flex from '@/shared/components/Flex';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';

interface IListRow {
  as?: 'div' | 'li';
  contents: React.ReactNode;
  left?: React.ReactNode;
  onClick?: () => void;
  right?: React.ReactNode;
  withArrow?: boolean;
}

function ListRow({ as, contents, left, onClick, right, withArrow = false }: IListRow) {
  return (
    <Flex row="start" as={as} onClick={onClick} className="relative h-[100px] cursor-pointer px-3 py-4 hover:rounded-2xl hover:bg-neutral-100">
      {left && (
        <Flex column="center" className="mr-3">
          {left}
        </Flex>
      )}
      <Flex column="center" row="start" className="flex-1">
        {contents}
      </Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? (
        <Flex column="center">
          <IconArrowRight />
        </Flex>
      ) : null}
    </Flex>
  );
}

function ListRowTexts({ title, subTitle }: { subTitle?: React.ReactNode; title: React.ReactNode }) {
  return (
    <Flex column="start">
      <Typography size="h5">{title}</Typography>
      <Spacing direction="vertical" size={20} />
      <Typography size="h6">{subTitle}</Typography>
    </Flex>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  );
}

ListRow.Texts = ListRowTexts;

export default ListRow;
