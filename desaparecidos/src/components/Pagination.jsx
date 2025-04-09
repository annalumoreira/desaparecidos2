import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
      
        if (totalPages <= 10) {
          for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
          if (currentPage <= 1) {
            pages.push(1, 2, 3, '...', totalPages);
          } else if (currentPage >= totalPages - 1) {
            pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
          } else {
            pages.push(
              1,
              '...',
              currentPage - 1,
              currentPage,
              currentPage + 1,
              '...',
              totalPages
            );
          }
        }
      
        return pages;
      };

  const handleClick = (page) => {
    if (page !== '...') onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        « Anterior
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`page-button ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
          disabled={page === '...'}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo »
      </button>
    </div>
  );
};

export default Pagination;
