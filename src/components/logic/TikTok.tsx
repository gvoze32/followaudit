import React, { useState } from 'react';
import { SharedLayout, NonFollowersTable, UploadSection, ActionsSection } from '../shared';
import { 
  HiOutlineDocumentSearch, 
  HiOutlineUserRemove,
  HiHome,
  HiChevronRight,
} from 'react-icons/hi';

interface TikTokUser {
  username: string;
  date: string;
  href: string;
}

const TiktokNotFollow = () => {
  const [userData, setUserData] = useState<any>(null);
  const [nonFollowers, setNonFollowers] = useState<TikTokUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showHowTo, setShowHowTo] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleFollowersFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target?.result as string);
        setUserData(parsedData);
        setErrorMessage('');
      } catch (error) {
        console.error('Error parsing file:', error);
        setErrorMessage('Error parsing file. Please make sure it is in the correct format.');
      }
    };
    reader.readAsText(file);
  };

  const processFiles = () => {
    if (!userData) {
      setErrorMessage('Please upload a valid TikTok user data file.');
      return;
    }

    try {
      const followersSet = new Set(
        userData.Profile["Follower List"].FansList.map((f: any) => f.UserName)
      );

      const followingList = userData.Profile["Following List"].Following.map(
        (f: any) => ({
          date: f.Date,
          href: `https://www.tiktok.com/@${f.UserName}`,
        })
      );

      const nonFollowersList = followingList.filter(
        (f: TikTokUser) => !followersSet.has(f.username)
      );

      setNonFollowers(nonFollowersList);
      setIsDataFetched(true);
    } catch (error) {
      setErrorMessage('Error processing data. Please ensure the file format is correct.');
    }
  };

  const toggleHowTo = () => {
    setShowHowTo(prev => !prev);
  };

  return (
    <SharedLayout platform="TikTok">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <UploadSection 
          handleFollowersFileUpload={handleFollowersFileUpload}
          handleFollowingFileUpload={handleFollowersFileUpload}
          platform="TikTok"
        />
        <ActionsSection processFiles={processFiles} platform="TikTok" onHowTo={toggleHowTo} checkNotFollowing={() => {}} />
      </div>

      {showHowTo && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow m-4 p-6 mb-4 mx-auto">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">How to Download Your TikTok Data</h3>
            <button 
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300" 
              onClick={toggleHowTo}
            >
              Close
            </button>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Open TikTok and go to your profile.</li>
            <li>Tap the three-line menu icon in the top right.</li>
            <li>Go to "Settings and privacy".</li>
            <li>Tap "Account", then tap on "Download your data".</li>
            <li>Tap "Select data to download".</li>
            <li>Choose "Custom" then check "Profile and posts".</li>
            <li>Tap "Select file format".</li>
            <li>Select "JSON" as the file format.</li>
            <li>Tap "Request data".</li>
            <li>Once ready, download the ZIP file containing your data.</li>
            <li>Extract the ZIP file and locate the user_data.json file.</li>
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

export default TiktokNotFollow;