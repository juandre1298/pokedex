import React from "react";

const Pagination = (props) => {
  const { onLeftClick, onRightClick, page, totalPages } = props;
  return (
    <div className="pagination">
      <button className="pagination-Btn" onClick={onLeftClick}>
        {"<"}
      </button>
      <div>
        {page} de {totalPages}
      </div>
      <button className="pagination-Btn" onClick={onRightClick}>
        {">"}
      </button>
    </div>
  );
};
export default Pagination;
