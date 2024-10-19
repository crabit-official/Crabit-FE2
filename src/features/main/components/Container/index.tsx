'use client';

import React from 'react';

import cn from '@/shared/utils/style';

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: IContainerProps) {
  return <div className={cn(`mx-auto px-4 sm:px-2 md:px-10 xl:px-20`, className)}>{children}</div>;
}

export default Container;
