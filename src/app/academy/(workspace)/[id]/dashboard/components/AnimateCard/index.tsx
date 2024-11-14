import React from 'react';
import Image from 'next/image';

import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Skeleton from '@/shared/components/Skeleton/Skeleton';
import Typography from '@/shared/components/Typography';

/**
 * AnimateCard Component
 * @params imageUrl: string
 * @params onClick: () => void
 * @params subTitle: string
 * @params title: string
 */

interface IAnimateCard {
  imageUrl: string;
  leftLabel?: React.ReactNode;
  onClick: () => void;
  subTitle: string;
  title: string;
}

function AnimateCard({ imageUrl, onClick, subTitle, title, leftLabel }: IAnimateCard) {
  return (
    <Framer
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      className="relative flex h-fit min-h-80 w-[300px] cursor-pointer flex-col items-center justify-between overflow-hidden rounded-lg border border-solid border-gray-100 bg-white shadow-custom transition-shadow duration-300 hover:shadow-hover-custom sm:w-64"
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="thumbnail img" width={480} height={100} className="h-40 w-full object-cover" />
      ) : (
        <Image src="/images/logo_app.png" alt="default thumbnail img" width={480} height={100} className="h-40 w-full object-cover" />
      )}

      {leftLabel && (
        <Flex column="center" className="absolute left-2 top-2 rounded-2xl bg-gray-300 p-2 shadow-custom">
          {leftLabel}
        </Flex>
      )}

      <Flex column="start" className="size-full min-h-32 gap-2 px-6">
        <Typography size="h5" className="break-keep">
          {title}
        </Typography>
        <Typography size="h5" as="p" className="text-overflow-3 break-keep text-xs opacity-60">
          {subTitle}
        </Typography>
      </Flex>
    </Framer>
  );
}

function AnimateCardSkeleton() {
  return (
    <Framer className="relative flex h-fit min-h-80 w-[300px] flex-col items-center justify-between overflow-hidden rounded-lg border border-solid border-gray-100 bg-white shadow-custom sm:w-64">
      <Skeleton height={160} />
      <Flex column="start" className="size-full min-h-32 gap-2 px-6">
        <Skeleton height={20} />
        <Skeleton height={20} width={100} />
      </Flex>
    </Framer>
  );
}

AnimateCard.Skeleton = AnimateCardSkeleton;

export default AnimateCard;
