import React from "react";

import "../asset/Admin.scss";

const CustomPagination = ({
    totalElement,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 0; i < Math.ceil(totalElement / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "active" : ""}>
                        {page+1}
                    </button>
                );
            })}
        </div>
    );
};

export default CustomPagination;
