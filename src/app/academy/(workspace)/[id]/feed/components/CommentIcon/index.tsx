import React from 'react';
import type { IconType } from 'react-icons';

interface ICommentIconProps {
  icon: IconType;
  onClick: () => void;
}

function CommentIcon({ icon: Icon, onClick }: ICommentIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-fit rounded-full border border-solid border-gray-100 bg-gray-100 p-1 transition duration-200 ease-in-out hover:border-main-deep-pink"
    >
      {Icon && <Icon className="text-gray-500 group-hover:text-main-deep-pink" size={13} />}
    </button>
  );
}

export default CommentIcon;
