'use client';

import React from 'react';

interface IContainerProps {
  children: React.ReactNode;
}

function Container({ children }: IContainerProps) {
  return <div className="mx-auto px-4 sm:px-2 md:px-10 xl:px-20">{children}</div>;
}

export default Container;
