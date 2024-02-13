'use client';

import Header from './Header';
import Workflows from './Workflows/Workflows';
import Dashboard from './Dashboard/Dashboard';

function Layout({ children }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full flex flex-col gap-6">
        <div className="w-full">
          <Workflows />
        </div>
        <div className="w-full h-full">
          <Dashboard />
        </div>
      </div>

      <div className="">{children}</div>
    </div>
  );
}

export default Layout;
