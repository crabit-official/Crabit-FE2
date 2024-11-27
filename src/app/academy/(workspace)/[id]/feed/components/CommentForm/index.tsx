'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import useCreateComment from '@/shared/hooks/comments/useCreateComment';
import useGetProfile from '@/shared/hooks/main/useGetProfile';

interface ICommentProps {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}

function CommentForm({ releasedChallengeId, studentChallengeLogId, academyId }: ICommentProps) {
  const { data: profile } = useGetProfile();
  const [content, setContent] = useState<string>('');
  const { mutate } = useCreateComment({ academyId, releasedChallengeId, studentChallengeLogId });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      releasedChallengeId,
      studentChallengeLogId,
      academyId,
      content,
      parentId: null,
    });
    setContent('');
  };

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
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex row="between" className="w-full gap-2 rounded-xl bg-gray-100/90 px-4 py-2">
          <input className="w-full bg-transparent text-xs focus:outline-none" value={content} onChange={(e) => setContent(e.target.value)} required />
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
