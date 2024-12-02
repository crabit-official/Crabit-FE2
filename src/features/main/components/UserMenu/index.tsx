'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import MenuItem from '@/features/main/components/MenuItem';
import useLoginModal from '@/features/main/hooks/use-login-modal';
import useRegisterModal from '@/features/main/hooks/use-register-modal';
import Avatar from '@/shared/components/Avatar';
import Typography from '@/shared/components/Typography';
import useGetProfile from '@/shared/hooks/main/useGetProfile';

function UserMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const queryClient = useQueryClient();

  const { data: profile } = useGetProfile();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    queryClient.clear();
    router.replace('/');
    router.refresh();
  };

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
          onClick={() => {
            router.push('/my/academy');
          }}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          내 학원
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:flex md:items-center md:gap-2">
            {profile?.profileImageUrl ? (
              <Image
                alt="profile"
                src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile?.profileImageUrl}`}
                width={100}
                height={100}
                className="size-[30px] rounded-full object-cover"
              />
            ) : (
              <Avatar />
            )}
            {profile ? (
              <Typography size="h5" as="p" className="text-xs">
                {profile?.name}
              </Typography>
            ) : null}
          </div>
        </div>
      </div>
      {isOpen && (
        <div onMouseLeave={() => setIsOpen(false)} className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {!profile ? (
              <>
                <MenuItem
                  className="block md:hidden"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/space/enroll');
                  }}
                  label="기관 등록하기"
                />
                <MenuItem
                  className="block md:hidden"
                  onClick={() => {
                    setIsOpen(false);
                    toast.success('하이');
                    router.push('/academy/my');
                  }}
                  label="내 학원"
                />
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
              </>
            ) : (
              <>
                <MenuItem
                  className="block md:hidden"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/space/enroll');
                  }}
                  label="기관 등록하기"
                />
                <MenuItem
                  className="block md:hidden"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/academy/my');
                  }}
                  label="내 학원"
                />
                <MenuItem
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/profile');
                  }}
                  label="마이페이지"
                />
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  label="로그아웃"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
