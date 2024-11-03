import React from 'react';

interface ILayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

function Layout({ children, modal }: ILayout) {
  return (
    <div className="xl:px-30 max-w-8xl container mx-auto px-4 pb-8 pt-12">
      <div className="grid gap-20">
        {children}
        {modal}
      </div>
    </div>
  );
}

export default Layout;
