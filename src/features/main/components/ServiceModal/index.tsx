'use client';

import useServiceModal from '../../hooks/use-service-modal';

import Heading from '@/shared/components/Heading';
import Modal from '@/shared/components/Modal';

function ServiceModal() {
  const serviceModal = useServiceModal();

  const bodyContent = (
    <div>
      <Heading title="서비스 약관 동의" />
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
      onClose={serviceModal.onClose}
      onSubmit={() => serviceModal.onClose()}
      actionLabel="확인"
      isOpen={serviceModal.isOpen}
      title=""
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ServiceModal;
