import React, { useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import RowDropdown from "./RowDropdown"; // مطمئن شو که این کامپوننت موجوده

function Pagination({
  searchTerm,
  filteredCategories,
  info,
  categoryPerPage,
  currentData,
  indexOfLastCategory,
  indexOfFirstCategory,
}) {
  const [paginate, setPaginate] = useState({
    currentPage: 1,
    jumpInput: "",
    dropdown: false,
  });

  const { currentPage, jumpInput, dropdown } = paginate;

  const totalPages = Math.ceil(
    (searchTerm ? filteredCategories.length : info.length) / categoryPerPage
  );

  //   const indexOfLastCategory = currentPage * categoryPerPage;
  //   const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPaginate((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPaginate((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const jumpHandler = (e) => {
    const input = Number(e.target.value);
    setPaginate((prev) => ({ ...prev, jumpInput: input }));

    if (input > totalPages || input < 1) {
      alert(`Page must be between 1 to ${totalPages}`);
      setPaginate((prev) => ({ ...prev, currentPage: 1 }));
    } else {
      setPaginate((prev) => ({ ...prev, currentPage: input }));
    }
  };

  const dropdownHandler = () => {
    setPaginate((prev) => ({ ...prev, dropdown: !prev.dropdown }));
  };

  const handleRowsChange = (newRows) => {
    setPaginate({ currentPage: 1, categoryPerPage: newRows, dropdown: false });
  };

  return (
    <div className="text-nowrap bg-blue-950 bg-opacity-10 border-[1px] border-blue-950 border-opacity-15 rounded-b-2xl shadow-2xl">
      <div className="flex items-center justify-between p-3">
        <div className="flex relative">
          <p className="text-sm text-slate-500 pr-3 pt-2.5">
            Page {currentPage} of {totalPages}
          </p>
          <div className="group rounded border border-slate-300 pr-2 h-fit py-1 mt-1.5 pl-1 m-1 lg:px-3 text-center text-xs font-semibold text-slate-600 transition-all ">
            <label className="group-hover:text-ocean group-focus-within:text-ocean text-sm text-slate-500">
              jump to page
              <input
                type="number"
                max={totalPages}
                value={jumpInput}
                placeholder=" "
                className="pl-4 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-10 outline-none bg-inherit"
                onChange={jumpHandler}
              />
            </label>
          </div>

          <div className="relative flex group rounded border border-slate-300 text-nowrap h-fit py-1 mt-1 text-center text-xs font-semibold text-slate-600 transition-all hover:cursor-pointer">
            <p
              onClick={dropdownHandler}
              className="group-hover:text-ocean group-focus-within:text-ocean text-sm text-slate-500 pl-1"
            >
              rows
              <span> {categoryPerPage}</span>
            </p>
            <p>
              <MdArrowDropUp size={20} />
            </p>
            {dropdown && (
              <div className="absolute bottom-10 mx-auto left-6 shadow-lg rounded mt-1 z-50">
                <RowDropdown onSelect={handleRowsChange} />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            disabled={currentPage === 1}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
