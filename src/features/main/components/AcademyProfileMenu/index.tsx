'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import MenuItem from '@/features/main/components/MenuItem';
import Avatar from '@/shared/components/Avatar';
import Typography from '@/shared/components/Typography';
import useManageAcademy from '@/shared/hooks/academy/useManageAcademy';

function AcademyProfileMenu() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const { useGetAcademyMemberProfile } = useManageAcademy();
  const { data: profile } = useGetAcademyMemberProfile({ academyId: Number(params.id) });

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'GET',
    });
    queryClient.clear();
    router.replace('/');
    router.refresh();
  };

  return (
    <div
      onClick={toggleOpen}
      className="relative flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-custom md:px-2 md:py-1"
    >
      <AiOutlineMenu />
      <div className="hidden md:flex md:items-center md:gap-2">
        {profile?.result?.profileImageUrl ? (
          <Image
            alt="profile"
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile.result.profileImageUrl}`}
            width={100}
            height={100}
            className="size-[30px] rounded-full border border-solid border-gray-100 object-cover"
          />
        ) : (
          <Avatar />
        )}
        {profile ? (
          <Typography size="h5" as="p" className="text-xs">
            {profile?.result?.nickname}
          </Typography>
        ) : null}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onMouseLeave={() => setIsOpen(false)}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-custom md:w-[10vw]"
          >
            <div className="flex cursor-pointer flex-col">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AcademyProfileMenu;
