'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import MenuItem from '@/features/main/components/MenuItem';
import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import Avatar from '@/shared/components/Avatar';

function UserMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => router.push('/space/enroll')}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          기관 등록하기
        </div>
        <div
          onClick={() => router.push('/academy/my')}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          내 학원
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <MenuItem
              onClick={() => {
                loginModal.onOpen();
                setIsOpen(false);
              }}
              label="로그인"
            />
            <MenuItem
              onClick={() => {
                registerModal.onOpen();
                setIsOpen(false);
              }}
              label="회원가입"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
