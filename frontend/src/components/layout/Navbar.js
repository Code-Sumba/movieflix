import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ['Action', 'Comedy', 'Drama', 'Thriller', 'Horror'];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false); // Close mobile menu
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            MovieFlix
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <div className="relative group">
              <button className="hover:text-gray-300">Categories</button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black hidden group-hover:block z-10">
                <div className="py-1">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="ml-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="px-3 py-1 rounded-l text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-red-600 px-3 py-1 rounded-r hover:bg-red-700"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="ml-4">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            {/* Admin Link */}
            <Link to="/admin" className="ml-4 hover:text-gray-300">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <Link to="/" className="block py-2 hover:text-gray-300">
              Home
            </Link>
            <div className="py-2">
              <p className="mb-2">Categories</p>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="block hover:text-gray-300"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <form onSubmit={handleSearchSubmit} className="py-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="px-3 py-1 rounded-l text-black flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-red-600 px-3 py-1 rounded-r hover:bg-red-700"
                >
                  Search
                </button>
              </div>
            </form>
            <Link to="/admin" className="block py-2 hover:text-gray-300">
              Admin
            </Link>
            <button onClick={toggleDarkMode} className="block py-2">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 