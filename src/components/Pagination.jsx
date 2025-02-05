function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="join flex justify-center mt-8 font-mono">
      {pages.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;