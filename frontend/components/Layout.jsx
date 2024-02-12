'use client';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

function Layout({ children }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex w-full h-full ml-6">
        <Sidebar />
      </div>

      <div className="">{children}</div>
    </div>
  );
}

export default Layout;
