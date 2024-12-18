'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import CardApply from '@/features/card/components/CardApply';
import CardInfo from '@/features/card/components/CardInfo';
import CardQuestion from '@/features/card/components/CardQuestion';
import Flex from '@/shared/components/Flex';

function CrabitCardPage() {
  const infoRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  const sectionRefs = useMemo(
    () => [
      {
        id: 0,
        ref: infoRef,
        text: '장학카드 활용법',
      },
      {
        id: 1,
        ref: applyRef,
        text: '신청 & 주문 과정',
      },
      {
        id: 2,
        ref: questionRef,
        text: '자주 묻는 질문',
      },
    ],
    [infoRef, applyRef, questionRef],
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleSection = sectionRefs.find((section) => section.ref.current === entry.target);
          if (visibleSection) {
            setActiveSection(visibleSection.id);
          }
        }
      });
    }, observerOptions);

    sectionRefs.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  const handleMenuClick = (index: number) => {
    const section = sectionRefs[index].ref.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Flex column="start" className="gap-10">
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
