import type { IconType } from 'react-icons';
import Link from 'next/link';

interface ILinkBoxProps {
  currentPath: string;
  icon: IconType;
  label: string;
  path: string;
}

function LinkBox({ label, icon: Icon, path, currentPath }: ILinkBoxProps) {
  return (
    <Link
      href={path}
      className={`${path === currentPath ? 'font-medium text-main-deep-pink' : 'text-gray-600'} flex cursor-pointer gap-2 p-5 hover:text-main-deep-pink`}
    >
      <Icon />
      {label}
    </Link>
  );
}
export default LinkBox;
