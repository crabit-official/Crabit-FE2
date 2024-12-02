'use client';

import cn from '@/shared/utils/style';

interface IMenuItemProps {
  className?: string;
  label: string;
  onClick: () => void;
}

function MenuItem({ onClick, label, className }: IMenuItemProps) {
  return (
    <div onClick={onClick} className={cn('px-4 py-3 font-semibold transition hover:bg-gray-100', className)}>
      {label}
    </div>
  );
}

export default MenuItem;
