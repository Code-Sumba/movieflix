import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiFilm, FiList, FiBarChart2, 
  FiFileText, FiSettings, FiLogOut, 
  FiMenu, FiX, FiChevronDown, FiChevronUp
} from 'react-icons/fi';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoviesSubmenuOpen, setIsMoviesSubmenuOpen] = useState(false);
  const [isScraperSubmenuOpen, setIsScraperSubmenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const toggleMoviesSubmenu = () => {
    setIsMoviesSubmenuOpen(!isMoviesSubmenuOpen);
  };
  
  const toggleScraperSubmenu = () => {
    setIsScraperSubmenuOpen(!isScraperSubmenuOpen);
  };
  
  const handleLogout = () => {
    // No authentication, just redirect to home
    navigate('/');
  };
  
  // Navigation items with icons
  const navigationItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiBarChart2 /> },
    { 
      name: 'Movies', 
      icon: <FiFilm />,
      hasSubmenu: true,
      isOpen: isMoviesSubmenuOpen,
      toggle: toggleMoviesSubmenu,
      submenu: [
        { name: 'All Movies', path: '/admin/movies' },
        { name: 'Add Movie', path: '/admin/movies/add' }
      ]
    },
    { 
      name: 'Scrapers', 
      icon: <FiList />,
      hasSubmenu: true,
      isOpen: isScraperSubmenuOpen,
      toggle: toggleScraperSubmenu,
      submenu: [
        { name: 'Sources', path: '/admin/scraper/sources' },
        { name: 'Logs', path: '/admin/logs' }
      ]
    },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> }
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            MovieFlix Admin
          </Link>
          <button 
            onClick={closeSidebar}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <FiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Sidebar navigation */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={item.toggle}
                      className="flex items-center w-full px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                      <span className="ml-auto">
                        {item.isOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    </button>
                    
                    {item.isOpen && (
                      <ul className="pl-10 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <NavLink
                              to={subItem.path}
                              onClick={closeSidebar}
                              className={({ isActive }) => 
                                `block px-4 py-2 rounded-md text-sm ${
                                  isActive
                                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                              }
                            >
                              {subItem.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 rounded-md ${
                        isActive
                          ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                    end={item.path === '/admin'}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          
          <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/"
                  className="flex items-center px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiHome className="mr-3" />
                  <span>Back to Site</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiLogOut className="mr-3" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 py-3 flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-1 mr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <FiMenu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
            
            <h1 className="text-xl font-bold text-gray-800 dark:text-white lg:hidden">
              Admin Panel
            </h1>
            
            <div className="ml-auto flex items-center space-x-4">
              {/* Add any header controls here (notifications, profile, etc.) */}
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 