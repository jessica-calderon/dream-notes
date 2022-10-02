import React from 'react';
import classNames from 'classnames';


const PaginationRange = (start, end) => {
    return [...Array(end).keys()].map((el) => el + start);
  };

  const PaginationItem = ({ page, currentPage, onPageChange }) => {
    const liClasses = classNames({
      "page-item": true,
      active: page === currentPage,
    });

    return (
        <li className= {liClasses} onClick={() => onPageChange(page)}>
          <span className="page-link">{page}</span>
        </li>
      );
    };

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = PaginationRange(1, pagesCount);
    return (
    <ul className='pagination'>
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={page}
          onPageChange={onPageChange}
        />
      ))}  
    </ul>
    );

  
  };







export default Pagination;