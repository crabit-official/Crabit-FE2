'use client';

import React from 'react';

import cn from '@/shared/utils/style';

interface IMenuItemProps {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

function MenuItem({ onClick, label, className, icon }: IMenuItemProps) {
  return (
    <div onClick={onClick} className={cn('flex items-center gap-2 px-4 py-3 font-semibold transition hover:bg-gray-100', className)}>
      {icon}
      {label}
    </div>
  );
}

export default MenuItem;
