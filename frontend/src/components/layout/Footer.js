import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiMessageCircle } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              MovieFlix
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Your one-stop destination for all the latest movies and web series with direct download links.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="mt-4 space-y-2">
              {['Hindi', 'English', 'South', 'Dubbed', 'Web Series'].map((category) => (
                <li key={category}>
                  <Link 
                    to={`/category/${category}`}
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Trending Movies', path: '/trending' },
                { name: 'Latest Uploads', path: '/latest' },
                { name: 'Search', path: '/search' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: 'Disclaimer', path: '/disclaimer' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'DMCA', path: '/dmca' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <FiGithub className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <FiTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <FiInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <FiMessageCircle className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 md:mt-0 text-base text-gray-500 dark:text-gray-400 md:order-1">
            &copy; {currentYear} MovieFlix. All rights reserved.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center">
          <p>Disclaimer: MovieFlix does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 