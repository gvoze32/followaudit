import React from 'react';

export const NonFollowersTable = ({ 
  nonFollowers, 
  isDataFetched 
}: { 
  nonFollowers: Array<{ username: string; href: string }>;
  isDataFetched: boolean;
}) => {
  return (
    <div className="mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left bg-gray-800 text-white">
          {nonFollowers.length > 0 ? "People who don't follow you back" : "No non-followers found"}
          <p className="mt-1 text-sm font-normal text-gray-500">
            Total non-followers: {nonFollowers.length}
          </p>
        </caption>
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">No.</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Profile</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {nonFollowers.length === 0 && !isDataFetched ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center bg-gray-900 text-gray-300">
                Upload your data file to see results...
              </td>
            </tr>
          ) : nonFollowers.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center bg-green-900 text-green-300">
                Everyone you follow follows you back.
              </td>
            </tr>
          ) : (
            nonFollowers.map((user, index) => (
              <tr key={index} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-white">{user.username}</td>
                <td className="px-6 py-4">
                  <a href={user.href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    View Profile
                  </a>
                </td>
                <td className="px-6 py-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};