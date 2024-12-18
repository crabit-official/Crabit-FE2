import { useEffect, useMemo, useRef, useState } from 'react';

const useSectionRef = () => {
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

  return { activeSection, sectionRefs, applyRef, questionRef, infoRef, handleMenuClick };
};

export default useSectionRef;
