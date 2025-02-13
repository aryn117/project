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
  const [sortKey, setSortKey] = useState('seeders');



  // ////////////////////////////////////////////////////////////////////////////////
  const handleSearch = async (event) => {
    if(event) event.preventDefault();

    const pageNumber = currentPage;
    const query = searchTerm.trim();

    if (!query) {
      toast.error('Please enter a search term.');
      return;
    }

    if (pageNumber < 1) {
      setCurrentPage(1);
      toast.error('Page number was invalid. Try again now!');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await searchTorrent({
        query,
        page: pageNumber,
        site: siteToSearch,
      });
      console.log("🚀 ~ handleSearch ~ data:", data);

      if (data.error) {
        console.log("🚀 ~ data.error Triggered");
        throw new Error(data.error);
      }

      setTorrents(data);
      console.log("🚀 ~ handleSearch ", torrents);
    } catch (error) {
      console.error('Error in handleSearchSubmit:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ////////////////////////////////////////////////////////////////////////////////  
  const parseSize = (size) => {
    const units = { "MB": 1, "GB": 1024, "TB": 1048576 };
    const match = size.match(/([\d.]+)\s*(MB|GB|TB)/);
    return match ? parseFloat(match[1]) * units[match[2]] : 0;
  };
  // ////////////////////////////////////////////////////////////////////////////////
  const parseDate = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year + 2000, month - 1, day); // Assuming 21 means 2021, etc.
  };
  // ////////////////////////////////////////////////////////////////////////////////


  // ////////////////////////////////////////////////////////////////////////////////

  const handleSort = () => {

    console.log('sortKey', sortKey);
    console.log('sortOrder', sortOrder);

    const sortedTorrents = [...torrents].sort((a, b) => {
      let valA, valB;
      if (sortKey === "size") {
        valA = parseSize(a.size);
        valB = parseSize(b.size);
      } else if (sortKey === "dateuploaded") {
        valA = parseDate(a.dateuploaded);
        valB = parseDate(b.dateuploaded);
      } else {
        valA = Number(a[sortKey]);
        valB = Number(b[sortKey]);
      }
      return sortOrder === "desc" ? valA - valB : valB - valA;
    });

    setTorrents(sortedTorrents);

  }


  console.log('torrents', torrents);
  return (
    <>
      <div className="container px-2 py-8 mx-auto">
        <div className='flex justify-center w-full mb-6 font-mono text-2xl font-semibold md:text-4xl' >
          Search
        </div>

        <SiteSelector siteToSearch={siteToSearch} setSiteToSearch={setSiteToSearch} />

        <div className="max-w-3xl mt-2 md:mt-4 mx-auto mb-4 md:mb-8">
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
            <div className='flex w-full max-w-3xl flex-row justify-between mb-2 items-center'>
            <div className="flex gap-2 flex-col sm:flex-row ">
              <select
                className="select select-sm w-fit select-bordered"
                value={sortKey}
                onChange={(e) => {
                  setSortKey(e.target.value);
                  handleSort();
                }}
              >
                <option value="seeders">Seeders</option>
                <option value="size">Size</option>
                <option value="dateuploaded">Date Uploaded</option>
              </select>
              <select
                className="select select-sm select-bordered"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  handleSort();
                }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>

            </div>
         

              <div className="flex  justify-center items-center w-full py-2  z-50  ">
                <button className="join-btn btn-sm btn-outline  btn" onClick={() => { setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage); handleSearch() }} ><FaCaretLeft /></button>
                <button className="join-item btn-sm btn-outline mx-2 btn">{currentPage}</button>
                <button className="join-item btn-sm btn-outline   btn" onClick={() => { setCurrentPage(currentPage + 1); handleSearch() }} > <FaCaretRight /> </button>
              </div>
            
            </div>
          )

        }
 {isLoading && <LoadingSpinner />}
        {
          torrents && torrents.length > 0 && (
            <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {torrents.map((torrent) => (
                <TorrentCard key={torrent.url} torrent={torrent} />
              ))}
            </div>
          )

        }



       

        {error && (
          <div className="alert alert-error">
            <span>{error.message || 'Something went wrong'}</span>
          </div>
        )}


      </div>
      
    </>
  );
}

export default Home;