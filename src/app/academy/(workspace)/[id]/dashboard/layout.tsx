import React from 'react';

function Layout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div className="xl:px-30 max-w-8xl container mx-auto h-full">
      <div className="grid h-dvh grid-cols-5">
        <h1>Sidebar</h1>
        <div className="col-span-4 border-x lg:col-span-3">
          {modal ?? <div>모달이 안나오는 이유</div>}
          {children}
        </div>
        <h1>TrendBar</h1>
      </div>
    </div>
  );
}

export default Layout;
