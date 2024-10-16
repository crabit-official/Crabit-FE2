import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import cn from '@/shared/utils/style';

const FlexVariants = cva('flex', {
  variants: {
    row: {
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      end: 'justify-end',
    },
    column: {
      center: 'flex-col justify-center',
      between: 'flex-col justify-between',
      around: 'flex-col justify-around',
      evenly: 'flex-col justify-evenly',
      end: 'flex-col justify-end',
    },
    rowColumn: {
      center: 'flex-col items-center justify-center',
      between: 'flex-col items-center justify-between',
      around: 'flex-col items-center justify-around',
      evenly: 'flex-col items-center justify-evenly',
      end: 'flex-col items-center justify-end',
    },
  },
  defaultVariants: {
    row: 'center',
  },
});

interface IFlexProps extends VariantProps<typeof FlexVariants> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Flex 컴포넌트
 * @param children Flex 박스 내부의 컨텐츠를 작성합니다.
 * @param row row 주축 기준 flex를 선언합니다.
 * @param column column 주축 기준 flex를 선언합니다.
 * @param rowColumn 주축과, 반대축 모두를 기준으로 flex를 선언합니다.
 * @param className 추가 스타일링에 대한 코드를 작성합니다.
 * @constructor
 */
function Flex({ children, row, column, rowColumn, className }: IFlexProps) {
  return <div className={cn(FlexVariants({ row, column, rowColumn }), className)}>{children}</div>;
}

export default Flex;
