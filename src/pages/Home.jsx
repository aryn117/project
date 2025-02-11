import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchAllSites, searchSingleSite } from '../api/torrentApi';
import LoadingSpinner from '../components/LoadingSpinner';
import TorrentCard from '../components/TorrentCard';

import toast from 'react-hot-toast';

import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import SiteSelector from '../components/SiteSelector';

function Home() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [siteToSearch, setSiteToSearch] = useState("1337x");
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const { data, isLoading, error } = useQuery(
    ['search', searchTerm, currentPage],
    () => {
      if(siteToSearch === "all") {
       return searchAllSites({ query: searchTerm, page: currentPage });
      } else {
         return searchSingleSite({ site: siteToSearch, query: searchTerm, page: currentPage });
      }
    },
    {
      enabled: !!searchTerm,
      onError: (err) => {
        toast.error(err.message || 'Failed to fetch results');
      },
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    setCurrentPage(currentPage);
    
    console.log('Current Page:', currentPage, "searchTerm:", searchTerm);
  };



  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className='flex justify-center w-full mb-12 font-mono text-3xl font-semibold md:text-5xl' >
          Search
        </div>

        <SiteSelector siteToSearch={siteToSearch} setSiteToSearch={setSiteToSearch} />

        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search torrents..."
              className="flex-1 font-mono active:outline-none input "
            />
            <button type="submit" className="font-mono btn btn-primary">
              Search
            </button>
          </form>
        </div>


        {
          data && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map((torrent) => (
                <TorrentCard key={torrent.url} torrent={torrent} />
              ))}
            </div>
          )

        }



        {isLoading && <LoadingSpinner />}

        {error && (
          <div className="alert alert-error">
            <span>{error.message || 'Something went wrong'}</span>
          </div>
        )}


      </div>
      {data &&

        <div className="flex mb-6 bottom-0 h-12  justify-center items-center w-full py-2  z-50  ">
          <button className="join-btn btn-outline mx-2 btn" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)} ><FaCaretLeft /></button>
          <button className="join-item btn-outline mx-2 btn">{currentPage}</button>
          <button className="join-item btn-outline mx-2  btn" onClick={() => setCurrentPage(currentPage + 1)} > <FaCaretRight /> </button>
        </div>
      }
    </>
  );
}

export default Home;