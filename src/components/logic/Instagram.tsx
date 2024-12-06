import React, { useState } from 'react';
import { ActionsSection, NonFollowersTable, SharedLayout, UploadSection } from '../shared';

interface InstagramUser {
  username: string;
  href: string;
}

const InstagramNotFollow: React.FC = () => {
  const [followersData, setFollowersData] = useState<any[]>([]);
  const [followingData, setFollowingData] = useState<any[]>([]);
  const [nonFollowers, setNonFollowers] = useState<InstagramUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showHowTo, setShowHowTo] = useState<boolean>(false);

  const handleFollowersFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target?.result as string);
          setFollowersData(prev => [...prev, parsedData]);
          setErrorMessage('');
        } catch (error) {
          console.error('Error parsing followers file:', error);
          setErrorMessage('Error parsing followers file. Please make sure it is in the correct format.');
        }
      };
      reader.readAsText(file);
    });
  };

  const handleFollowingFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target?.result as string);
          setFollowingData(prev => [...prev, parsedData]);
          setErrorMessage('');
        } catch (error) {
          console.error('Error parsing following file:', error);
          setErrorMessage('Error parsing following file. Please make sure it is in the correct format.');
        }
      };
      reader.readAsText(file);
    });
  };

  const processFiles = () => {
    if (!followersData.length || !followingData.length) {
      setErrorMessage('Invalid JSON format. Please upload valid files.');
      return;
    }

    const followersSet = new Set<string>();
    followersData.forEach(data => {
      data.forEach((f: any) => {
        if (f.string_list_data && f.string_list_data[0] && f.string_list_data[0].value) {
          followersSet.add(f.string_list_data[0].value);
        }
      });
    });

    const followingList: InstagramUser[] = [];
    followingData.forEach(data => {
      data.relationships_following.forEach((f: any) => {
        if (f.string_list_data && f.string_list_data[0] && f.string_list_data[0].value) {
          followingList.push({
            username: f.string_list_data[0].value,
            href: f.string_list_data[0].href
          });
        }
      });
    });

    const nonFollowersList = followingList.filter(f => !followersSet.has(f.username));
    setNonFollowers(nonFollowersList);
  };

  const toggleHowTo = () => {
    setShowHowTo(prev => !prev);
  };

  const [isDataFetched, setIsDataFetched] = useState(false);

  return (
    <SharedLayout platform="Instagram">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <UploadSection 
          handleFollowersFileUpload={handleFollowersFileUpload}
          handleFollowingFileUpload={handleFollowingFileUpload}
          platform="Instagram"
        />
        <ActionsSection 
          processFiles={processFiles} 
          platform="Instagram" 
          onHowTo={toggleHowTo} 
          checkNotFollowing={() => {}} 
        />
      </div>

      {showHowTo && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow m-4 p-6 mb-4 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">How to Download Your Instagram Data</h3>
            <button 
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300" 
              onClick={toggleHowTo}
            >
              Close
            </button>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Go to your Instagram profile and click on the menu icon (three horizontal lines).</li>
            <li>Navigate to "Accounts Center", then click "Your information and permissions".</li>
            <li>Click "Download your information", then click "Download or transfer information".</li>
            <li>Select the profiles you’d like to download information from.</li>
            <li>Click "Next", then select "Some of your information".</li>
            <li>Choose "Followers and Following" and click "Next".</li>
            <li>Select "Download to device".</li>
            <li>Choose the file options:
              <ul className="list-disc list-inside ml-4">
                <li>Date range: All time</li>
                <li>Notify: Your email address</li>
                <li>Format: JSON</li>
                <li>Media quality: Low</li>
              </ul>
            </li>
            <li>Click "Create files".</li>
            <li>Once you receive the download completion email, click the link to download the ZIP file.</li>
            <li>Extract the ZIP file and locate the followers.json and following.json files.</li>
          </ol>
        </div>
      )}

      <NonFollowersTable 
        nonFollowers={nonFollowers}
        isDataFetched={isDataFetched}
      />
    </SharedLayout>
  );
};

export default InstagramNotFollow;