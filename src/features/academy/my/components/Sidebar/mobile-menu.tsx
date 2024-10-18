'use client';

import React, { useState } from 'react';

function MobileMenu({
  item,
}: {
  item: {
    icon: React.ReactNode;
    path: string;
    title: string;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setIsOpen((prev) => !prev)}>필터</div>
      {isOpen ? (
        <div className="flex w-full cursor-pointer items-center gap-3 rounded-2xl p-5 transition hover:bg-neutral-100">
          {item.icon}
          {item.title}
        </div>
      ) : null}
    </>
  );
}

export default MobileMenu;
