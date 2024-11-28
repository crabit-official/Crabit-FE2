import React, { useCallback } from 'react';

import Button from '@/shared/components/Button';
import Flex from '@/shared/components/Flex';
import Framer from '@/shared/components/Framer';
import Typography from '@/shared/components/Typography';

interface IModalProps {
  actionLabel: React.ReactNode;
  body?: React.ReactNode;
  disabled: boolean;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: React.ReactNode;
  title?: string;
}

function SmallModal({ isOpen = true, onClose, onSubmit, body, actionLabel, disabled, secondaryAction, secondaryActionLabel, title }: IModalProps) {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <Flex
      column="center"
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/60 outline-none backdrop-blur-sm focus:outline-none"
      onClick={onClose}
    >
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="relative mx-auto my-6 w-11/12 max-w-[450px] sm:w-2/3">
        <Framer duration={0.5}>
          <Flex column="between" className="relative size-full gap-4 rounded-2xl bg-white py-2">
            <Flex column="center" className="gap-2 px-10 pt-10">
              <Typography size="h3" className="text-center opacity-80">
                {title}
              </Typography>
              {body}
            </Flex>
            <div className="flex flex-col gap-2 px-10 py-6">
              <Flex className="w-full gap-4">
                {secondaryAction && secondaryActionLabel && (
                  <Button variant="secondary" disabled={disabled} onClick={handleSecondaryAction}>
                    {secondaryActionLabel}
                  </Button>
                )}
                <Button disabled={disabled} onClick={handleSubmit}>
                  {actionLabel}
                </Button>
              </Flex>
            </div>
          </Flex>
        </Framer>
      </div>
    </Flex>
  );
}
export default SmallModal;
