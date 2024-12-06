import React from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';

export const SharedLayout = ({ children, platform }: { children: React.ReactNode; platform: string }) => {
  return (
    <div className="dark min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
                <HiHome className="w-4 h-4 mr-2" />
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
              <HiChevronRight className="w-5 h-5 text-gray-500" />
              <a href={`/${platform.toLowerCase()}`} className="ml-1 text-sm font-medium text-gray-400 hover:text-white">
                {platform}
              </a>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {platform}
          </h1>
        </div>

        {children}

        <footer className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow m-4">
          <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">© 2024 FollowAudit</span>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};