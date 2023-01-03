import React from 'react';

const Pagenation = ({
  totalReports,
  reportsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalReports / reportsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="p-5 flex justify-center gap-2">
      {pages.map((page, index) => {
        return (
          <button
            className={
              page === currentPage
                ? 'p-2  text-white rounded-full items-center justify-center w-10 bg-blue-500'
                : 'p-2 bg-gray-600 text-white rounded-full items-center justify-center w-10'
            }
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
            currentPage
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagenation;
