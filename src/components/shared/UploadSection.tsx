import React from 'react';

interface UploadSectionProps {
  handleFollowersFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFollowingFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  platform?: string;
}

export const UploadSection = ({ 
  handleFollowersFileUpload,
  handleFollowingFileUpload,
  platform = "" 
}: UploadSectionProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Upload Files</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="followersFile"
            className="block mb-2 text-sm font-medium"
          >
            Followers JSON File
          </label>
          <input
            type="file"
            id="followersFile"
            accept=".json"
            multiple
            onChange={handleFollowersFileUpload}
            className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-700"
          />
        </div>
        
        {platform !== "TikTok" && (
          <div>
            <label
              htmlFor="followingFile"
              className="block mb-2 text-sm font-medium"
            >
              Following JSON File
            </label>
            <input
              type="file"
              id="followingFile"
              accept=".json"
              multiple
              onChange={handleFollowingFileUpload}
              className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg cursor-pointer bg-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};