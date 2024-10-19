'use client';

import { useCallback, useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaCommentDots } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import MenuItem from '@/features/main/components/MenuItem';
import Flex from '@/shared/components/Flex';
import Typography from '@/shared/components/Typography';

interface IContentProps {
  content: string;
  imgUrl?: string;
}

function Content({ content, imgUrl }: IContentProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return (
    <Flex column="center" className="relative gap-4 rounded-2xl bg-white p-4 shadow-transparent transition-all duration-200 hover:shadow-lg">
      <Flex column="center" className="gap-4 sm:flex-row">
        <CiMenuKebab className="absolute right-3 top-3 cursor-pointer text-neutral-300" onClick={toggleOpen} />
        {imgUrl && (
          <Image
            onClick={() => router.push('/academy/123/dashboard/1')}
            alt="이미지 설명"
            className="mt-6 h-52 w-full shrink-0 rounded-lg bg-[#131315] object-contain sm:mt-0 sm:w-52"
            width={100}
            height={100}
            src={imgUrl}
          />
        )}

        <Typography size="h5" as="p" className="max-h-[450px] min-h-14 w-full overflow-hidden break-all pr-4 text-sm">
          {content}
        </Typography>
      </Flex>

      <Flex row="between" className="px-1">
        <Flex className="gap-2">
          <FaHeart className="text-main-pink" />
          <FaCommentDots className="text-neutral-200" />
        </Flex>
        <Image className="rounded-full" height="20" width="20" alt="Index" src="/images/placeholder.jpg" />
      </Flex>
      <div className="absolute right-3 top-8 w-28 overflow-hidden rounded-xl bg-white text-sm shadow-md">
        {isOpen && <MenuItem onClick={() => {}} label="삭제하기" />}
      </div>
    </Flex>
  );
}

export default Content;
