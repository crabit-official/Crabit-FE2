'use client';

import CardApply from '@/features/card/components/CardApply';
import CardInfo from '@/features/card/components/CardInfo';
import CardQuestion from '@/features/card/components/CardQuestion';
import useSectionRef from '@/features/card/hooks/useSectionRef/useSectionRef';
import Flex from '@/shared/components/Flex';

function CrabitCardPage() {
  const { sectionRefs, applyRef, activeSection, infoRef, questionRef, handleMenuClick } = useSectionRef();

  return (
    <Flex column="start" className="gap-32">
      <div className="group fixed right-8 top-40 z-10 cursor-pointer">
        <Flex column="start" className="items-end gap-3">
          {sectionRefs.map((item) => (
            <div key={item.id} className={`h-[2px] w-4 ${activeSection === item.id ? 'w-5 bg-gray-600' : 'bg-gray-300'}`} />
          ))}
        </Flex>
        <Flex column="start" className="absolute left-[-140px] top-[-10px] hidden w-40 gap-4 rounded-xl bg-[#fafafa] px-3 py-4 shadow-custom group-hover:flex">
          {sectionRefs.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`text-gray-600 hover:font-semibold hover:text-main-pink ${activeSection === item.id ? 'font-semibold text-main-deep-pink' : ''}`}
            >
              {item.text}
            </button>
          ))}
        </Flex>
      </div>

      <CardInfo title="크래빗 장학카드" ref={infoRef} />
      <CardApply title="신청 & 주문 과정" ref={applyRef} />
      <CardQuestion title="자주 묻는 질문" ref={questionRef} />
    </Flex>
  );
}

export default CrabitCardPage;
