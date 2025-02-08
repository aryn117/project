import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchAllSites } from '../api/torrentApi';
import LoadingSpinner from '../components/LoadingSpinner';
import TorrentCard from '../components/TorrentCard';
import Pagination from '../components/Pagination';
import SortSelect from '../components/SortSelect';
import toast from 'react-hot-toast';

function Home() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const { data, isLoading, error } = useQuery(
    ['search', searchTerm, currentPage],
    () => searchAllSites({ query: searchTerm, limit: 20, page: currentPage }),
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

  const sortTorrents = (torrents) => {
    if (!sortBy || !torrents) return torrents;

    return [...torrents].sort((a, b) => {
      if (sortBy === 'seeders') {
        const aValue = parseInt((a?.seeders || '0').replace(/,/g, ''));
        const bValue = parseInt((b?.seeders || '0').replace(/,/g, ''));
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (sortBy === 'size') {
        const getSizeInBytes = (size) => {
          if (!size) return 0;
          const units = { 'KB': 1, 'MB': 2, 'GB': 3, 'TB': 4 };
          const matches = size.match(/^([\d.]+)\s*([KMGT]B)$/i);
          if (!matches) return 0;
          const [, value, unit] = matches;
          return parseFloat(value) * Math.pow(1024, units[unit.toUpperCase()] || 0);
        };
        const aSize = getSizeInBytes(a?.size);
        const bSize = getSizeInBytes(b?.size);
        return sortOrder === 'asc' ? aSize - bSize : bSize - aSize;
      }

      return 0;
    });
  };

  const sortedTorrents = data?.data ? sortTorrents(data.data) : [];

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className='flex justify-center w-full mb-12 font-mono text-3xl font-semibold md:text-5xl' >
        Search
      </div>
      
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

      {data && (
        <div className="flex justify-end mb-4">
          <SortSelect
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      )}

      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="alert alert-error">
          <span>{error.message || 'Something went wrong'}</span>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedTorrents.map((torrent, index) => (
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