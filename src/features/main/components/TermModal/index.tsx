'use client';

import useTermModal from '../../hooks/use-term-modal';

import Heading from '@/shared/components/Heading';
import Modal from '@/shared/components/Modal';

function TermModal() {
  const termModal = useTermModal();

  const bodyContent = (
    <div>
      <Heading title="개인정보 처리 방침 동의" />
      <div className="w-full">123</div>
    </div>
  );

  const footerContent = (
    <div>
      <hr />
      <div className="flex flex-row items-center justify-center gap-2" />
    </div>
  );

  return (
    <Modal
      onClose={termModal.onClose}
      onSubmit={() => termModal.onClose()}
      actionLabel="확인"
      isOpen={termModal.isOpen}
      title=""
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default TermModal;
