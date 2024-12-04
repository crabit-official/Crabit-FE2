import type { PropsWithChildren } from 'react';

import cn from '@/shared/utils/style';

interface ITabs {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

function Tabs({ children }: PropsWithChildren) {
  return <div className="flex flex-col">{children}</div>;
}

function TabList({ children }: PropsWithChildren) {
  return <div className="flex justify-center gap-x-20">{children}</div>;
}

function Tab({ children, index, activeTab, setActiveTab }: PropsWithChildren<{ index: number } & ITabs>) {
  return (
    <button
      type="button"
      className={cn('border-b-3 flex py-10', {
        'font-bold text-main-deep-pink': activeTab === index,
        'border-transparent font-bold text-gray-500': activeTab !== index,
      })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: PropsWithChildren) {
  return <div className="flex-1">{children}</div>;
}

function TabPanel({ children, index, activeTab }: PropsWithChildren<{ activeTab: number; index: number }>) {
  return <div hidden={index !== activeTab}>{children}</div>;
}

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export default Tabs;
