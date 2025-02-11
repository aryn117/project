import { useState } from 'react';
import { searchTorrent } from '../api/torrentApi';
import LoadingSpinner from '../components/LoadingSpinner';
import TorrentCard from '../components/TorrentCard';

import { useSettings } from '../contexts/settingsContext';

import toast from 'react-hot-toast';

import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import SiteSelector from '../components/SiteSelector';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [siteToSearch, setSiteToSearch] = useState("1337x");
  const { settings } = useSettings();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [torrents, setTorrents] = useState([]);

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');


console.log(settings.resultLayout);

  const handleSearch = async (e) => {
    e.preventDefault();
  setTorrents([]);
    setError(null);
    setIsLoading(true);

    // validate query and currentpage
    if (!searchTerm) {
      toast.error('Please enter a search term.');
      setIsLoading(false);
      return;
    } else if (currentPage < 1) {
      setCurrentPage(1);
      toast.error('Page Number was Invalid. Try Again Now!');
      return;
    }

    setSearchTerm(searchTerm);
    setCurrentPage(currentPage);

    try {

      const data = await searchTorrent({ query: searchTerm, page: currentPage, site: siteToSearch });

      if (Object.keys(data)[0] === 'error') {
        throw new Error(data.error);
      } else {
        setTorrents(data);
        console.log("Response from searchTorrent: ", data);

      }


    } catch (error) {
      console.error('Error in handleSearch:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }






    console.log('Current Page:', currentPage, "searchTerm:", searchTerm);
  };



  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className='flex justify-center w-full mb-12 font-mono text-3xl font-semibold md:text-5xl' >
          Search
        </div>

        <SiteSelector siteToSearch={siteToSearch} setSiteToSearch={setSiteToSearch} />

        <div className="max-w-3xl mt-4 md:mt-6 mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search torrents..."
              className="flex-1 font-mono text-sm md:text-md input input-sm md:input-md input-primary"
            />
            <button type="submit" className="font-mono btn btn-sm md:btn-md  btn-primary">
              Search
            </button>
          </form>
        </div>


        {
          torrents && torrents.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {torrents.map((torrent) => (
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
      {torrents && torrents.length > 0 &&

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