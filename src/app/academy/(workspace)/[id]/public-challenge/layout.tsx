import type React from 'react';

interface ILayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

function Layout({ children, modal }: ILayout) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export default Layout;
