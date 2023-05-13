import React, {useEffect} from "react";
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/solid';

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize);
    const isBrowser = () => typeof window !== 'undefined';

    useEffect(() => {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const prevNextChange = (type) => {
        switch (type) {
            case 'prev':
                if(currentPage > 1) onPageChange(currentPage - 1);
                break;
            case 'next':
                if(currentPage < pagesCount) onPageChange(currentPage + 1);
                break;
        }
    };

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const buttonClass = 'text-center text-white p-2 rounded-full max-w-[40px] w-full bg-indigo-200';

    return (
      <div className="my-10">
          <div className="flex justify-center gap-[6px] flex-wrap items-center">
              <button
                className={`${buttonClass} ${currentPage === 1 ? '' : 'hover:bg-indigo-400'}`}
                disabled={currentPage === 1}
                onClick={() => prevNextChange('prev')}
              >
                  <ArrowLeftIcon />
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  className={ `hover:bg-indigo-400 ${buttonClass} ${page === currentPage ? 'bg-indigo-400' : ''}`}
                  onClick={() => onPageChange(page)}>
                    {page}
                </button>
              ))}
              <button
                className={`${buttonClass} ${currentPage === pagesCount ? '' : 'hover:bg-indigo-400'}`}
                disabled={currentPage === pagesCount}
                onClick={() => prevNextChange('next')}
              >
                  <ArrowRightIcon />
              </button>
          </div>
      </div>
    );
};

export default Pagination;