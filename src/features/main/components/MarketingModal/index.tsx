'use client';

import useMarketingModal from '../../hooks/use-marketing-modal';

import Heading from '@/shared/components/Heading';
import Modal from '@/shared/components/Modal';

function MarketingModal() {
  const marketingModal = useMarketingModal();

  const bodyContent = (
    <div>
      <Heading title="마케팅 약관 동의" />
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
      onClose={marketingModal.onClose}
      onSubmit={() => marketingModal.onClose()}
      actionLabel="확인"
      isOpen={marketingModal.isOpen}
      title=""
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default MarketingModal;
