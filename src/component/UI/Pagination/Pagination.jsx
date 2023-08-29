import React from "react";
import { usePagination } from "../../../hooks/usePagination";

export default function Pagination({ totalPages, page, setPage }) {
  let pagesArray = usePagination(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => {
        return (
          <span
            onClick={() => setPage(p)}
            key={p}
            className={page === p ? "page page__current" : "page"}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
}
