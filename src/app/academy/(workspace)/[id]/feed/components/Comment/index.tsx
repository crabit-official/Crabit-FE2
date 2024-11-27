import React from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { IoArrowUndo } from 'react-icons/io5';
import Image from 'next/image';

import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';
import { COMMENT_STATUS } from '@/shared/enums/comment';
import type { ICommentList } from '@/shared/types/comment';
import formatDate from '@/shared/utils/date';

function Comment({ comment, academyMember }: ICommentList) {
  return (
    <Flex column="start" className="mt-10 w-full gap-2">
      <Flex row="start" className="w-full items-center gap-2">
        {academyMember?.academyProfileImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyMember.academyProfileImageUrl}`}
            alt="profile"
            width={100}
            height={100}
            className="size-[30px] rounded-full border border-solid border-gray-200 object-cover"
          />
        ) : (
          <Avatar />
        )}
        <Typography size="h7" as="p" className="font-normal opacity-80">
          <strong className="font-semibold">{academyMember?.nickname}</strong> • {formatDate(comment.createdAt)}
        </Typography>
      </Flex>
      <Flex column="start" className="ml-5 gap-2">
        <Typography size="h7" className="w-fit rounded-xl bg-main-deep-pink/20 px-4 py-2 font-normal">
          {comment?.commentStatus === COMMENT_STATUS.ACTIVE && comment.content}
          {comment?.commentStatus === COMMENT_STATUS.DELETED && '삭제된 댓글 입니다. 색상 변경할것'}
        </Typography>
        <Flex row="start" className="gap-2">
          <button
            type="button"
            className="w-fit rounded-full border border-solid border-gray-100 bg-gray-100 p-1 transition duration-200 ease-in-out hover:border-main-deep-pink"
          >
            <AiFillAlert className="text-gray-500" size={13} />
          </button>
          <button
            type="button"
            className="w-fit rounded-full border border-solid border-gray-100 bg-gray-100 p-1 transition duration-200 ease-in-out hover:border-main-deep-pink"
          >
            <IoArrowUndo className="rotate-180 text-gray-500" size={13} />
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}

function CommentSkeleton() {
  return (
    <Flex column="start" className="mt-10 w-full gap-2">
      <Flex row="start" className="items-center gap-2">
        <Skeleton height={30} width={30} className="rounded-full" />
        <Skeleton height={20} width={150} className="rounded-xl" />
      </Flex>
      <Skeleton height={40} className="ml-5 rounded-xl" />
    </Flex>
  );
}

Comment.Skeleton = CommentSkeleton;

export default Comment;
