// src/components/shared/InputSection.tsx
import React, { useState, useEffect } from 'react';

// InputSection.tsx
interface InputSectionProps {
  username: string;
  setUsername: (username: string) => void;
  onCheck: () => void;
}

export const InputSection = ({ 
  username, 
  setUsername
}: InputSectionProps) => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) {
        setUserAvatar(null);
        return;
      }
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserAvatar(data.avatar_url);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Check GitHub Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {userAvatar && (
            <img 
              src={userAvatar} 
              alt={`${username}'s avatar`}
              className="w-16 h-16 rounded-full border-2 border-purple-500"
            />
          )}
          <div className="flex-1">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium"
            >
              GitHub Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg bg-gray-700 p-2.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};