import React from 'react';
import type { IconType } from 'react-icons';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import cn from '@/shared/utils/style';

const ButtonVariants = cva('flex w-full items-center justify-center rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70', {
  variants: {
    variant: {
      main: 'border-2 border-main-pink bg-main-pink',
      outline: 'border-main-black bg-main-white',
    },
    size: {
      sm: 'border py-1',
      md: 'border-2 py-3',
    },
  },
  defaultVariants: {
    variant: 'main',
    size: 'md',
  },
});

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  className?: string;
  icon?: IconType;
}

/**
 * Button 컴포넌트
 * @param children Button 내부의 컨텐츠를 합니다.
 * @param className 추가 스타일링에 대한 코드를 작성합니다.
 * @param variant 어떤 종류의 버튼인지, 명시합니다.
 * @param size 어떤 크기의 버튼인지, 명시합니다.
 * @param Icon Icon 사용시 react-icons를 활용하여, Icon을 적용합니다.
 * @param props 추가 버튼 속성들을, 전달할 수 있습니다.
 * @constructor
 */
function Button({ children, className, variant, size, icon: Icon, ...props }: IButtonProps) {
  return (
    <button type="button" className={cn(ButtonVariants({ variant, size }), className)} {...props}>
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

export default Button;
