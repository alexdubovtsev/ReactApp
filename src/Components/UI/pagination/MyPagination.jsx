import React, { useState } from "react";
import { getPagesArray } from "../../../Utils/pages";

const MyPagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        // Если элемент итерации функции map равен номеру текущей страницы, добавим доп.класс
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default MyPagination;
