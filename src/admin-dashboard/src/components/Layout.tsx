import { useState } from 'react';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />

      <div
        className={`flex-1 flex flex-col ${
          sidebarOpen ? 'ml-72' : 'ml-0'
        } md:ml-72 transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
