'use client';

import { IoMdArrowRoundUp } from 'react-icons/io';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import useGetProfile from '@/shared/hooks/main/useGetProfile';

function CommentForm() {
  const { data: profile } = useGetProfile();
  return (
    <Flex className="w-full items-center gap-3">
      {profile?.profileImageUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${profile?.profileImageUrl}`}
          alt="profile"
          width={50}
          height={50}
          className="size-[30px] rounded-full border border-solid border-gray-200 bg-gray-50"
        />
      ) : (
        <Avatar />
      )}
      <form className="w-full">
        <Flex row="between" className="w-full gap-2 rounded-xl bg-gray-100/90 px-4 py-2">
          <input className="w-full bg-transparent focus:outline-none" />
          <button
            type="submit"
            className="rounded-full border border-solid border-gray-200 bg-white p-1 transition duration-200 ease-in-out hover:border-main-deep-pink hover:shadow-hover-pink"
          >
            <IoMdArrowRoundUp className="text-main-deep-pink" />
          </button>
        </Flex>
      </form>
    </Flex>
  );
}

export default CommentForm;
