'use client';

import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useRouter } from 'next/navigation';

import MenuItem from '@/app/academy/(workspace)/[id]/dashboard/components/MenuItem';
import Flex from '@/shared/components/Flex';
import { PUBLIC_MENU } from '@/shared/constants/tab-menu';
import useDebounce from '@/shared/hooks/useDebounce';

interface IMenubarProps {
  academyId: number;
  activeTab: string;
}

function Menubar({ academyId, activeTab }: IMenubarProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const debounceSearch = useDebounce(search.trim(), 500);

  useEffect(() => {
    let url = `/academy/${academyId}/dashboard?tab=${activeTab ?? 'all'}`;

    if (debounceSearch) url += `&search=${debounceSearch}`;

    router.push(url);
  }, [debounceSearch, activeTab, academyId, router]);

  return (
    <Flex column="start" className="gap-4">
      <ul>
        <MenuItem title="카테고리" content={PUBLIC_MENU} academyId={academyId} activeTab={activeTab} />
      </ul>
      <Flex row="between" className="w-full items-center rounded-xl border border-solid border-gray-200 bg-gray-50 px-3 py-2">
        <input
          className="w-5/6 bg-transparent text-sm outline-none"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="제목을 입력해주세요."
        />
        <IoIosSearch className="size-4" />
      </Flex>
    </Flex>
  );
}

export default Menubar;
