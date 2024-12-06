import { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface NonFollower {
  username: string;
  href: string;
  avatarUrl: string;
}

export const NonFollowersTableAvatar = ({
  nonFollowers,
  isDataFetched,
}: {
  nonFollowers: NonFollower[];
  isDataFetched: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = nonFollowers.slice(offset, offset + itemsPerPage);

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
            <th scope="col" className="px-6 py-3">Avatar</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Profile</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {nonFollowers.length === 0 && !isDataFetched ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center bg-gray-900 text-gray-300">
                Upload your data file to see results...
              </td>
            </tr>
          ) : nonFollowers.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center bg-green-900 text-green-300">
                Everyone you follow follows you back.
              </td>
            </tr>
          ) : (
            currentPageData.map((user, index) => (
              <tr key={index} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">{offset + index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={user.avatarUrl}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full border border-gray-600"
                  />
                </td>
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
      {nonFollowers.length > itemsPerPage && (
        <div className="flex items-center justify-center mt-4 mb-4">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(nonFollowers.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'inline-flex -space-x-px text-sm'}
            pageClassName={''}
            pageLinkClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white'}
            activeClassName={'active'}
            activeLinkClassName={'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-700 bg-gray-700 hover:bg-gray-700 hover:text-white'}
            previousClassName={''}
            previousLinkClassName={'flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-l-lg hover:bg-gray-700 hover:text-white'}
            nextClassName={''}
            nextLinkClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-700 hover:text-white'}
            breakClassName={''}
            breakLinkClassName={'flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
      )}
    </div>
  );
};
