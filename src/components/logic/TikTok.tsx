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
        <ActionsSection processFiles={processFiles} platform="TikTok" onHowTo={() => {}} checkNotFollowing={() => {}} />
      </div>

      <NonFollowersTable 
        nonFollowers={nonFollowers}
        isDataFetched={isDataFetched}
      />
    </SharedLayout>
  );
};

export default TiktokNotFollow;