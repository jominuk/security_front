// import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const pages: number[] = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="flex justify-center items-center space-x-2">
//       <button
//         onClick={() => onPageChange(1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         맨 처음
//       </button>
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         이전
//       </button>
//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-4 py-2 rounded ${
//             currentPage === page
//               ? "bg-blue-700 text-white"
//               : "bg-blue-500 text-white"
//           }`}
//         >
//           {page}
//         </button>
//       ))}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         다음
//       </button>
//       <button
//         onClick={() => onPageChange(totalPages)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         맨 마지막
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage - half < 1) {
      end = Math.min(totalPages, end + (half - currentPage + 1));
    }

    if (currentPage + half > totalPages) {
      start = Math.max(1, start - (currentPage + half - totalPages));
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-3 mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-300 text-gray-700"
        }`}
      >
        « First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-300 text-gray-700"
        }`}
      >
        ‹ Prev
      </button>

      {currentPage > 3 && <span className="text-gray-400">...</span>}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <span className="text-gray-400">...</span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-300 text-gray-700"
        }`}
      >
        Next ›
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-300 text-gray-700"
        }`}
      >
        Last »
      </button>
    </div>
  );
};

export default Pagination;
