import React from 'react';

function Menu({
  item,
  onClick,
}: {
  item: {
    icon: React.ReactNode;
    path: string;
    title: string;
  };
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="flex w-full cursor-pointer items-center gap-3 rounded-2xl p-5 transition hover:bg-neutral-100">
      {item.icon}
      {item.title}
    </div>
  );
}

export default Menu;
