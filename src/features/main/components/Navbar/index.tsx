'use client';

import { AiFillHome } from 'react-icons/ai';
import { usePathname, useRouter } from 'next/navigation';

import AcademyMenu from '@/features/main/components/AcademyMenu';
import AcademyProfileMenu from '@/features/main/components/AcademyProfileMenu';
import Container from '@/features/main/components/Container';
import UserMenu from '@/features/main/components/UserMenu';
import useScrollTop from '@/features/main/hooks/use-scroll-top';
import Logo from '@/shared/components/Logo';
import cn from '@/shared/utils/style';

function Navbar() {
  const scrolled = useScrollTop();
  const pathname = usePathname();
  const router = useRouter();

  let menu;

  if (pathname.startsWith('/academy')) {
    menu = (
      <div className="flex h-[80px] items-center justify-between gap-3 md:gap-0">
        <div className="flex h-full items-center gap-2">
          <button type="button" className="rounded-xl p-2 text-gray-900 hover:bg-gray-100" onClick={() => router.push('/my/academy')}>
            <AiFillHome size={30} />
          </button>
          <div className="h-2/5 w-px bg-gray-200" />
          <AcademyMenu />
        </div>
        <div className="flex items-center justify-center">
          <AcademyProfileMenu />
        </div>
      </div>
    );
  } else {
    menu = (
      <div className="flex items-center justify-between gap-3 md:gap-0">
        <Logo />
        <div className="flex items-center justify-center">
          <UserMenu />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-background fixed top-0 z-50 w-full', scrolled && 'border-b shadow-sm')}>
      <Container>{menu}</Container>
    </div>
  );
}

export default Navbar;
