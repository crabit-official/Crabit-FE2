'use client';

import React, { useCallback, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useRouter, useSearchParams } from 'next/navigation';

import MenuItem from '@/app/academy/(workspace)/[id]/dashboard/components/MenuItem';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';
import { PUBLIC_MENU, SUBMISSION_STATU_MENU } from '@/shared/constants/tab-menu';
import { ACADEMY_ROLE } from '@/shared/enums/academy';
import useDebounce from '@/shared/hooks/useDebounce';

interface IMenubarProps {
  academyId: number;
  activeTab: string;
  role: ACADEMY_ROLE;
}

function Menubar({ academyId, activeTab, role }: IMenubarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>('');
  const debounceSearch = useDebounce(search.trim(), 500);
  const [releasedBy, setReleasedBy] = useState<'ALL' | 'SELF'>('ALL');

  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());

    params.set('tab', activeTab ?? 'all');

    if (debounceSearch) {
      params.set('search', debounceSearch);
    } else {
      params.delete('search');
    }

    params.set('releasedByMe', releasedBy);

    router.push(`/academy/${academyId}/dashboard?${params.toString()}`);
  }, [searchParams, activeTab, debounceSearch, releasedBy, router, academyId]);

  React.useMemo(() => updateQueryParams(), [updateQueryParams]);

  return (
    <Flex column="start" className="w-full gap-4">
      {role !== ACADEMY_ROLE.STUDENT && (
        <div className="flex flex-col items-start gap-2">
          <button type="button" onClick={() => setReleasedBy('ALL')}>
            <Typography className={releasedBy === 'ALL' ? 'font-bold text-main-deep-pink' : ''} size="body2">
              기관 모든 챌린지
            </Typography>
          </button>
          <button type="button" onClick={() => setReleasedBy('SELF')}>
            <Typography className={releasedBy === 'SELF' ? 'font-bold text-main-deep-pink' : ''} size="body2">
              내가 배포한 챌린지
            </Typography>
          </button>
        </div>
      )}
      <ul>
        {role === ACADEMY_ROLE.STUDENT ? (
          <MenuItem title="챌린지 상태" content={SUBMISSION_STATU_MENU} academyId={academyId} activeTab={activeTab} />
        ) : (
          <MenuItem title="카테고리" content={PUBLIC_MENU} academyId={academyId} activeTab={activeTab} />
        )}
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
