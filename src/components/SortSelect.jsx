import React from 'react';

function SortSelect({ sortBy, setSortBy, sortOrder, setSortOrder }) {
  return (
    <div className="flex gap-2 items-center">
      <select
        className="select select-bordered font-mono"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">No Sorting</option>
        <option value="seeders">Seeders</option>
        <option value="size">Size</option>
      </select>
      
      {sortBy && (
        <select
          className="select select-bordered font-mono"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      )}
    </div>
  );
}

export default SortSelect