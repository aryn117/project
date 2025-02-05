import { useState } from 'react';
import { useQuery } from 'react-query';
import { getAllTrending, getTrending } from '../api/torrentApi';
import LoadingSpinner from '../components/LoadingSpinner';
import TorrentCard from '../components/TorrentCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import toast from 'react-hot-toast';

function Trending() {
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['trending', selectedSite, selectedCategory, currentPage],
    () => {
      if (selectedSite === 'all') {
        return getAllTrending({ limit: 20, page: currentPage });
      }
      return getTrending({ 
        site: selectedSite, 
        limit: 20, 
        page: currentPage,
        category: selectedCategory !== 'All' ? selectedCategory.toLowerCase() : undefined
      });
    },
    {
      onError: (err) => {
        toast.error(err.message || 'Failed to fetch trending torrents');
      },
    }
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-mono text-3xl font-bold md:text-5xl">Trending Torrents</h1>
        <p className="font-mono text-xl text-base-content/70">Most popular torrents right now</p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        <select 
          className="font-mono select select-bordered"
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          <option value="all">All Sites</option>
          <option value="1337x">1337x</option>
          <option value="piratebay">Pirate Bay</option>
          <option value="rarbg">RARBG</option>
        </select>
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

export default Trending;