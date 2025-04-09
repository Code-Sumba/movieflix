import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  // In a real app, check authentication status
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 ${isSidebarOpen ? 'block' : 'hidden'} md:block flex-shrink-0`}>
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          MovieFlix Admin
        </div>
        
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/admin"
                className={`block py-2 px-4 ${
                  location.pathname === '/admin' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/movies"
                className={`block py-2 px-4 ${
                  location.pathname.includes('/admin/movies') ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/admin/logs"
                className={`block py-2 px-4 ${
                  location.pathname === '/admin/logs' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Activity Logs
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          <Link to="/" className="block hover:bg-gray-700 py-2 px-4 rounded">
            Back to Site
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-left hover:bg-gray-700 py-2 px-4 rounded mt-2"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {isSidebarOpen ? 'Close Menu' : 'Menu'}
            </button>
            
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Admin User</span>
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 