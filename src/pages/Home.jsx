import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchAllSites, searchTorrents } from '../api/torrentApi';
import LoadingSpinner from '../components/LoadingSpinner';
import TorrentCard from '../components/TorrentCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import toast from 'react-hot-toast';

function Home() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const { data, isLoading, error } = useQuery(
    ['search', searchTerm, selectedSite, selectedCategory, currentPage],
    () => {
      if (selectedSite === 'all') {
        return searchAllSites({ query: searchTerm, limit: 20, page: currentPage });
      }
      return searchTorrents({
        site: selectedSite,
        query: searchTerm,
        limit: 20,
        page: currentPage,
        category: selectedCategory !== 'All' ? selectedCategory.toLowerCase() : undefined
      });
    },
    {
      enabled: !!searchTerm,
      onError: (err) => {
        toast.error(err.message || 'Failed to fetch results');
      },
    }
  );
  // Forhandling the app install prompt
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    setCurrentPage(1);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <button onClick={handleInstallClick} className="absolute p-1 text-2xl btn btn-primary bottom-2 left-2btn-rounded">⬇️</button>
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-mono text-3xl font-bold md:text-5xl">Tor Hopper</h1>
        <p className="font-mono text-lg md:text-xl text-base-content/70">Search across multiple torrent sites</p>
      </div>

      <div className="max-w-3xl mx-auto mb-8 l ">
        <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4 md:flex-row">
          {/* Site Selection DropDown list */}
          <select
            className="font-mono select w-fit select-bordered"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            <option value="all">All Sites</option>
            <option value="1337x">1337x</option>
            <option value="piratebay">Pirate Bay</option>
            <option value="rarbg">RARBG</option>
          </select>
          {/* Search Bar and Button Container */}
          <div className='w-full' >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search torrents..."
              className="flex-1 font-mono input input-bordered"
            />
            <button type="submit" className="ml-2 font-mono btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="alert alert-error">
          <span>{error.message || 'Something went wrong'}</span>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.data.map((torrent, index) => (
              <TorrentCard key={index} torrent={torrent} />
            ))}
          </div>

          {data.total_pages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.total_pages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;