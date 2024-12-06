import React, { useState } from 'react';
import { SharedLayout, NonFollowersTableAvatar, InputSection, ActionsSection } from '../shared';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

const GitHubNotFollow: React.FC = () => {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<GitHubUser[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [resultType, setResultType] = useState<'nonfollowers' | 'notfollowing' | null>(null);
  const [resultCaption, setResultCaption] = useState('');
  const [showHowTo, setShowHowTo] = useState<boolean>(false);

  const fetchAllPages = async (url: string): Promise<GitHubUser[]> => {
    let allData: GitHubUser[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(`${url}?per_page=5000&page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      allData = [...allData, ...data];
      hasMorePages = data.length === 100;
      page++;
    }
    return allData;
  };

  const checkNonFollowers = async () => {
    if (!username) {
      setErrorMessage('Please enter a GitHub username.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setResults([]);
    setResultCaption("People who don't follow you back");

    try {
      const [followers, following] = await Promise.all([
        fetchAllPages(`https://api.github.com/users/${username}/followers`),
        fetchAllPages(`https://api.github.com/users/${username}/following`)
      ]);

      const followersSet = new Set(followers.map(f => f.login));
      const nonFollowers = following.filter(f => !followersSet.has(f.login));
      
      setResults(nonFollowers);
      setIsDataFetched(true);
    } catch (error) {
      setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const checkNotFollowing = async () => {
    if (!username) {
      setErrorMessage('Please enter a GitHub username.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setResults([]);
    setResultCaption("People you don't follow back");

    try {
      const [followers, following] = await Promise.all([
        fetchAllPages(`https://api.github.com/users/${username}/followers`),
        fetchAllPages(`https://api.github.com/users/${username}/following`)
      ]);

      const followingSet = new Set(following.map(f => f.login));
      const notFollowing = followers.filter(f => !followingSet.has(f.login));
      
      setResults(notFollowing);
      setIsDataFetched(true);
    } catch (error) {
      setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const [checkType, setCheckType] = useState<'nonfollowers' | 'notfollowing' | null>(null);

const handleNonFollowers = async () => {
  if (!username) {
    setErrorMessage('Please enter a GitHub username.');
    return;
  }

  setLoading(true);
  setErrorMessage('');
  setResults([]);
  setResultCaption("People who don't follow you back");

  try {
    const [followers, following] = await Promise.all([
      fetchAllPages(`https://api.github.com/users/${username}/followers`),
      fetchAllPages(`https://api.github.com/users/${username}/following`)
    ]);

    const followersSet = new Set(followers.map(f => f.login));
    const nonFollowers = following.filter(f => !followersSet.has(f.login));
    
    setResults(nonFollowers);
    setIsDataFetched(true);
  } catch (error) {
    setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    setLoading(false);
  }
};

const handleNotFollowing = async () => {
  if (!username) {
    setErrorMessage('Please enter a GitHub username.');
    return;
  }

  setLoading(true);
  setErrorMessage('');
  setResults([]);
  setResultCaption("People you don't follow back");

  try {
    const [followers, following] = await Promise.all([
      fetchAllPages(`https://api.github.com/users/${username}/followers`),
      fetchAllPages(`https://api.github.com/users/${username}/following`)
    ]);

    const followingSet = new Set(following.map(f => f.login));
    const notFollowing = followers.filter(f => !followingSet.has(f.login));
    
    setResults(notFollowing);
    setIsDataFetched(true);
  } catch (error) {
    setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    setLoading(false);
  }
};

const handleCheck = (type: 'nonfollowers' | 'notfollowing') => {
  setCheckType(type);
  if (type === 'nonfollowers') {
    handleNonFollowers();
  } else {
    handleNotFollowing();
  }
};

const toggleHowTo = () => {
  setShowHowTo(prev => !prev);
};

  return (
    <SharedLayout platform="GitHub">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputSection
          username={username}
          setUsername={setUsername}
          onCheck={checkNonFollowers}
        />
        <ActionsSection
          processFiles={() => handleCheck('nonfollowers')}
          checkNotFollowing={() => handleCheck('notfollowing')}
          platform="GitHub"
          onHowTo={toggleHowTo}
        />
      </div>

      {showHowTo && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow m-4 p-6 mb-4 mx-auto">
            <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">How to Use This Tool</h3>
            <button 
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300" 
              onClick={toggleHowTo}
            >
              Close
            </button>
            </div>
            <p className="text-gray-300 mb-4">
              Enter a GitHub username in the input field and click on the "Check Non-Followers" button to identify users who do not follow you back
            </p>
            <p className="text-gray-300 mb-4">
              Alternatively, click on the "Check Not Following" button to see a list of users you do not follow back.
            </p>
        </div>
      )}

      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}
      {loading && (
        <div className="text-center mt-4">Loading...</div>
      )}
      <NonFollowersTableAvatar 
        nonFollowers={results.map(user => ({
          username: user.login,
          avatarUrl: user.avatar_url,
          href: user.html_url
        }))}
        isDataFetched={isDataFetched}
      />
    </SharedLayout>
  );
};

export default GitHubNotFollow;