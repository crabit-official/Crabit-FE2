'use client';

import Container from '@/features/main/components/Container';
import UserMenu from '@/features/main/components/UserMenu';
import useScrollTop from '@/features/main/hooks/use-scroll-top';
import Logo from '@/shared/components/Logo';
import cn from '@/shared/utils/style';

function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div className={cn('bg-background fixed top-0 z-50 w-full', scrolled && 'border-b shadow-sm')}>
      <Container>
        <div className="flex items-center justify-between gap-3 md:gap-0">
          <Logo />
          <div className="flex items-center justify-center">
            <UserMenu />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
