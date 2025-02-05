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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-mono mb-4">TorrentHub</h1>
        <p className="text-xl text-base-content/70 font-mono">Search across multiple torrent sites</p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <select 
            className="select select-bordered font-mono"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            <option value="all">All Sites</option>
            <option value="1337x">1337x</option>
            <option value="piratebay">Pirate Bay</option>
            <option value="rarbg">RARBG</option>
          </select>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search torrents..."
            className="input input-bordered flex-1 font-mono"
          />
          <button type="submit" className="btn btn-primary font-mono">
            Search
          </button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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