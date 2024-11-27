'use client';

import React, { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { AiFillAlert } from 'react-icons/ai';
import { IoArrowUndo } from 'react-icons/io5';
import Image from 'next/image';

import CommentForm from '@/app/academy/(workspace)/[id]/feed/components/CommentForm';
import Avatar from '@/shared/components/Avatar';
import Flex from '@/shared/components/Flex';
import Modal from '@/shared/components/Modal';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Textarea from '@/shared/components/Textarea';
import Typography from '@/shared/components/Typography';
import { COMMENT_STATUS } from '@/shared/enums/comment';
import useReportComment from '@/shared/hooks/comments/useReportComment';
import type { IComment } from '@/shared/types/comment';
import formatDate from '@/shared/utils/date';

interface ICommentProps extends IComment {
  academyId: number;
  parent?: boolean;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}

function Comment({ comment, academyMember, academyId, releasedChallengeId, studentChallengeLogId, parent = true }: ICommentProps) {
  const [reply, setReply] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useReportComment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleReport = (data: FieldValues) => {
    mutate({ academyId, releasedChallengeId, commentId: comment.commentId, reason: data.reason });
    setOpen((prev) => !prev);
  };

  return (
    <Flex column="start" className="w-full gap-2">
      <Modal
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit(handleReport)}
        actionLabel="신고하기"
        isOpen={open}
        title="신고하기"
        disabled={false}
        body={<Textarea register={register} errors={errors} required label="신고 이유" id="reason" />}
      />
      <Flex row="start" className="w-full items-center gap-2">
        {academyMember?.profileImageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_IMAGES}/${academyMember.profileImageUrl}`}
            alt="profile"
            width={100}
            height={100}
            className="size-[30px] rounded-full border border-solid border-gray-200 object-cover"
          />
        ) : (
          <Avatar />
        )}
        <Typography size="h7" as="p" className="text-xs font-normal opacity-80">
          <strong className="text-sm font-semibold">{academyMember?.nickname}</strong> • {formatDate(comment.createdAt)}
        </Typography>
      </Flex>
      <Flex column="start" className="ml-5 gap-2">
        <Typography
          size="h7"
          className={`w-fit rounded-xl bg-main-deep-pink/20 px-4 py-2 font-normal ${
            comment?.commentStatus === COMMENT_STATUS.ACTIVE ? 'bg-main-deep-pink/20' : 'bg-gray-100'
          }`}
        >
          {comment?.commentStatus === COMMENT_STATUS.ACTIVE && comment.content}
          {comment?.commentStatus === COMMENT_STATUS.DELETED && '삭제된 댓글 입니다.'}
          {comment?.commentStatus === COMMENT_STATUS.BLOCKED && '차단된 댓글 입니다.'}
          {comment?.commentStatus === COMMENT_STATUS.REPORTED && '신고된 댓글 입니다.'}
        </Typography>
        <Flex row="start" className="gap-2">
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="group w-fit rounded-full border border-solid border-gray-100 bg-gray-100 p-1 transition duration-200 ease-in-out hover:border-main-deep-pink"
          >
            <AiFillAlert className="text-gray-500 group-hover:text-main-deep-pink" size={13} />
          </button>
          {parent && (
            <button
              onClick={() => setReply((prev) => !prev)}
              type="button"
              className="group w-fit rounded-full border border-solid border-gray-100 bg-gray-100 p-1 transition duration-200 ease-in-out hover:border-main-deep-pink"
            >
              <IoArrowUndo className="rotate-180 text-gray-500 group-hover:text-main-deep-pink" size={13} />
            </button>
          )}
        </Flex>
      </Flex>
      {reply && (
        <div className="ml-4">
          <CommentForm
            academyId={academyId}
            releasedChallengeId={releasedChallengeId}
            studentChallengeLogId={studentChallengeLogId}
            parentId={comment.commentId}
          />
        </div>
      )}
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
