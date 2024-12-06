import { HiOutlineDocumentSearch, HiOutlineUserRemove, HiOutlineUsers } from 'react-icons/hi';

export const ActionsSection = ({ 
  processFiles,
  platform,
  onHowTo,
  checkNotFollowing 
}: { 
  processFiles: () => void;
  platform: string;
  onHowTo: () => void;
  checkNotFollowing?: () => void;
}) => {
  console.log('Platform:', platform);
  console.log('checkNotFollowing:', checkNotFollowing);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Actions</h2>
      <div className="space-y-4">
        <button
          onClick={processFiles}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
        >
          <HiOutlineDocumentSearch className="mr-2 w-5 h-5" />
          {platform === "GitHub" ? "Check Non-Followers" : "Check Files"}
        </button>

        {platform === "GitHub" && (
          <button
            onClick={checkNotFollowing}
            className="w-full bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
          >
            <HiOutlineUsers className="mr-2 w-5 h-5" />
            Check Not Following
          </button>
        )}

        <button
          onClick={onHowTo}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center"
        >
          <HiOutlineUserRemove className="mr-2 w-5 h-5" />
          How to Get {platform} Files
        </button>
      </div>
    </div>
  );
};