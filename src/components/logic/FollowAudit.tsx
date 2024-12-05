import React, { useState } from 'react';
import { HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineSearch } from 'react-icons/hi';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

interface Platform {
  name: string;
  color: string;
  icon: JSX.Element;
  stats: string;
  link: string;
}

const FollowAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('features');
  
  const features: Feature[] = [
    {
      icon: <HiOutlineSearch className="w-6 h-6" />,
      title: "Smart Detection",
      description: "Identify non-followers with advanced algorithms",
      color: "info"
    },
    {
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      title: "Detailed Reports",
      description: "Comprehensive reports on follower patterns",
      color: "success"
    },
    {
      icon: <HiOutlineLightningBolt className="w-6 h-6" />,
      title: "Blazing Fast Process",
      description: "Analyze follower data quickly",
      color: "warning"
    },
    {
      icon: <HiOutlineShieldCheck className="w-6 h-6" />,
      title: "Privacy First",
      description: "Encrypted data, never stored",
      color: "purple"
    }
  ];

  const platforms: Platform[] = [
    {
      name: "Instagram",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6" />,
      stats: "active",
      link: "/instagram"
    },
    {
      name: "X",
      color: "bg-gradient-to-r from-gray-700 to-gray-900",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" alt="X" className="w-6 h-6" />,
      stats: "active",
      link: "/x"
    },
    {
      name: "TikTok",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
      icon: <img src="https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg" alt="TikTok" className="w-6 h-6" />,
      stats: "active",
      link: "/tiktok"
    },
    {
      name: "GitHub",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-6 h-6" />,
      stats: "active",
      link: "/github"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            FollowAudit
          </h1>
          <p className="text-xl text-gray-300">
            Track Your Social Media Growth Like Never Before
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Platform Analytics Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Platform Analytics</h2>
            <div className="space-y-4">
            {platforms.map((platform) => (
                <div
                key={platform.name}
                onClick={() => window.open(platform.link, '_blank')}
                className={`${platform.color} rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer`}
                >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <span className="text-3xl">{platform.icon}</span>
                    <span className="text-lg font-semibold">{platform.name}</span>
                    </div>
                    <div className="bg-green-300/20 px-4 py-2 rounded-full">
                    {platform.stats}
                    </div>
                </div>
                </div>
            ))}
            </div>
          </div>

          {/* Key Features Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-gray-700/50 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-800/50 p-3 rounded-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center space-x-4">
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
            >
              Donate me
            </button>
            <button
              onClick={() => window.open('https://github.com/gvoze32/followaudit', '_blank')}
              className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center space-x-3 border border-gray-700 shadow-lg hover:shadow-blue-500/20"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-6 h-6 opacity-90" />
              <span>View project on GitHub</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 FollowAudit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FollowAudit;