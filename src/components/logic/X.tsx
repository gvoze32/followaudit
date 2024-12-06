import React, { useState } from 'react';
import { SharedLayout, NonFollowersTable, UploadSection, ActionsSection } from '../shared';
import { 
  HiOutlineDocumentSearch, 
  HiOutlineUserRemove,
  HiHome,
  HiChevronRight,
} from 'react-icons/hi';

interface XUser {
  following: {
    accountId: string;
    userLink: string;
  };
}

const XNotFollow: React.FC = () => {
  const [followersData, setFollowersData] = useState<any[]>([]);
  const [followingData, setFollowingData] = useState<any[]>([]);
  const [nonFollowers, setNonFollowers] = useState<XUser[]>([]);
  const [showHowTo, setShowHowTo] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFollowersFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonData = JSON.parse(
          content.replace("window.YTD.follower.part0 = ", "")
        );
        setFollowersData(jsonData);
        setErrorMessage('');
      } catch (error) {
        console.error('Error parsing followers file:', error);
        setErrorMessage('Error parsing followers file. Please make sure it is in the correct format.');
      }
    };
    reader.readAsText(file);
  };

  const handleFollowingFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonData = JSON.parse(
          content.replace("window.YTD.following.part0 = ", "")
        );
        setFollowingData(jsonData);
        setErrorMessage('');
      } catch (error) {
        console.error('Error parsing following file:', error);
        setErrorMessage('Error parsing following file. Please make sure it is in the correct format.');
      }
    };
    reader.readAsText(file);
  };

  const processFiles = () => {
    if (!followersData.length || !followingData.length) {
      setErrorMessage('Please upload both follower and following files.');
      return;
    }

    const followersSet = new Set(
      followersData.map((f) => f.follower.accountId)
    );
    const nonFollowersList = followingData.filter(
      (f) => !followersSet.has(f.following.accountId)
    );

    setNonFollowers(nonFollowersList);
  };

  const toggleChecked = (index: number) => {
    const updatedNonFollowers = [...nonFollowers];
  };

  const toggleHowTo = () => {
    setShowHowTo(prev => !prev);
  };

  const [isDataFetched, setIsDataFetched] = useState(false);

  return (
    <SharedLayout platform="X">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <UploadSection 
          handleFollowersFileUpload={handleFollowersFileUpload}
          handleFollowingFileUpload={handleFollowingFileUpload}
          platform="X"
        />
        <ActionsSection processFiles={processFiles} platform="X" onHowTo={toggleHowTo} checkNotFollowing={() => {}} />
      </div>

      {showHowTo && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow m-4 p-6 mb-4 mx-auto">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">How to Download Your X Data</h3>
            <button 
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300" 
              onClick={toggleHowTo}
            >
              Close
            </button>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Tap your profile icon.</li>
            <li>Tap Settings and privacy.</li>
            <li>Select Your account.</li>
            <li>Tap Download an archive of your data.</li>
            <li>Confirm your password, then tap Request archive.</li>
            <li>Once ready, download the ZIP file containing your data.</li>
            <li>Extract the ZIP file and locate the follower.js and following.js file.</li>
            </ol>
        </div>
      )}

      <NonFollowersTable 
        nonFollowers={nonFollowers.map(follower => ({
          username: follower.following.accountId,
          href: follower.following.userLink
        }))}
        isDataFetched={isDataFetched}
      />
    </SharedLayout>
  );
};

export default XNotFollow;