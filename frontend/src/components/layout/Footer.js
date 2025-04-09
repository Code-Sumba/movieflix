import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiMessageCircle } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About MovieFlix</h3>
            <p className="text-gray-300">
              MovieFlix is a demo streaming platform showcasing modern web development techniques.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white">Search</Link>
              </li>
              <li>
                <Link to="/category/action" className="text-gray-300 hover:text-white">Categories</Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/action" className="text-gray-300 hover:text-white">Action</Link>
              </li>
              <li>
                <Link to="/category/comedy" className="text-gray-300 hover:text-white">Comedy</Link>
              </li>
              <li>
                <Link to="/category/drama" className="text-gray-300 hover:text-white">Drama</Link>
              </li>
              <li>
                <Link to="/category/thriller" className="text-gray-300 hover:text-white">Thriller</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <p className="text-gray-300 mb-2">
              Follow us on social media for updates:
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Twitter</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} MovieFlix. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/terms" className="hover:text-white mx-2">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white mx-2">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 