'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import Button from '@/shared/components/Button';

interface IModalProps {
  actionLabel: React.ReactNode;
  body?: React.ReactNode;
  disabled?: boolean;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: React.ReactNode;
  title?: React.ReactNode;
}

function Modal({ isOpen = true, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel }: IModalProps) {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none"
      onClick={onClose}
    >
      <div
        className="lg:w-3-/6 relative mx-auto my-6 size-full md:h-auto md:w-4/6 lg:h-auto xl:w-2/5"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {/* 컨텐츠 */}
        <div className={`translate h-full duration-300 ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'} `}>
          <div className="translate relative flex size-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
            {/* 머리 */}
            <div className="relative flex items-center justify-center rounded-t border-b p-6">
              <button type="button" onClick={handleClose} className="absolute left-9 border-0 p-1 transition hover:opacity-70">
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* 몸통 */}
            <div className="relative flex-auto p-6">{body}</div>
            {/* 다리 */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex w-full flex-row items-center gap-4">
                {secondaryAction && secondaryActionLabel && (
                  <Button variant="outline" disabled={disabled} onClick={handleSecondaryAction}>
                    {secondaryActionLabel}
                  </Button>
                )}
                {actionLabel && (
                  <Button disabled={disabled} onClick={handleSubmit}>
                    {actionLabel}
                  </Button>
                )}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
