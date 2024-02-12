'use client';

import Header from './Header';

function Layout({ children }) {
  return (
    <div className="w-full">
      <Header />
      <section className="flex w-full px-24 gap-x-20" />
      <div className="">{children}</div>
    </div>
  );
}

export default Layout;
