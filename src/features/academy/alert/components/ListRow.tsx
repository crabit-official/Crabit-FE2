import React from 'react';
import type { IconType } from 'react-icons';

import Flex from '@/shared/components/Flex';
import Spacing from '@/shared/components/Spacing/spacing';
import Typography from '@/shared/components/Typography';

interface IListRow {
  as?: 'div' | 'li';
  contents: React.ReactNode;
  icon?: IconType | null;
  left?: React.ReactNode;
  onClick?: () => void;
  onIconClick?: () => void;
  right?: React.ReactNode;
}

function ListRow({ as, contents, icon: Icon, left, onClick, onIconClick, right }: IListRow) {
  return (
    <Flex row="start" as={as} onClick={onClick} className="relative h-[100px] cursor-pointer px-3 py-4 hover:rounded-2xl hover:bg-neutral-100">
      <Flex className="mr-3">{left}</Flex>
      <Flex row="start" className="flex-1">
        {contents}
      </Flex>
      <Flex>{right}</Flex>
      <button onClick={onIconClick} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-main-white">
        {Icon ? <Icon size={20} /> : null}
      </button>
    </Flex>
  );
}

function ListRowTexts({ title, subTitle }: { subTitle?: React.ReactNode; title: React.ReactNode }) {
  return (
    <Flex column="start">
      <Typography size="h5">{title}</Typography>
      <Spacing direction="vertical" size={20} />
      <Typography size="h5-2">{subTitle}</Typography>
    </Flex>
  );
}

ListRow.Texts = ListRowTexts;

export default ListRow;
