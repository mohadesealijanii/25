import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { ClipLoader, PropagateLoader } from "react-spinners";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdArrowDropUp } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../modules/Sidebar";
import RowDropdown from "../modules/RowDropdown";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import CategoryModal from "../modules/CategoryModal";
import DeleteModal from "../modules/DeleteModal";
// import SearchRow from "./SearchRow";

function Table({ info, setInfo, fetchData, title, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(10);
  const [editedTitle, setEditedTitle] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selecetedId, setSelectedId] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [jumpInput, setJumpInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [check, setCheck] = useState(false);

  const [filteredCategories, setFilteredCategories] = useState(info);
  const [searchResult, setSearchResult] = useState(filteredCategories);
  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const totalPages = Math.ceil(info.length / categoryPerPage);
  const currentData = (searchTerm ? filteredCategories : info).slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   fetchData();
  // }, [info, filteredCategories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    setEditingCategoryId(null);
    setJumpInput("");
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setJumpInput("");
    }
  };

  const jumpHandler = (e) => {
    const input = e.target.value;
    setJumpInput(input);

    if (input > totalPages) {
      toast.error(`Page must be between 1 to ${totalPages}`);
      setCurrentPage(1);
    } else if (input === "") {
      setCurrentPage(1);
    } else {
      setCurrentPage(input);
    }
    setEditingCategoryId(null);
  };

  const dropdownHandler = () => {
    setDropdown((prev) => !prev);
  };

  const handleRowsChange = (newRows) => {
    setCategoryPerPage(newRows);
    setCurrentPage(1);
    setDropdown(false);
  };

  const editHandler = async (id) => {
    const token = Cookies.get("authToken");

    try {
      const res = await fetch(
        `https://stg-core.bpapp.net/api/BookCategory/GetBookCategoryForUpdate?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setEditingCategoryId(data.id);
      setEditedTitle(data.title);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveHandler = async (id) => {
    const token = Cookies.get("authToken");

    try {
      await fetch(
        `https://stg-core.bpapp.net/api/BookCategory/UpdateBookCategory`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, title: editedTitle }),
        }
      );

      fetchData();
      toast.success("Category updated successfully!");
      setEditingCategoryId(null);
      setEditedTitle("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelHandler = () => {
    setEditingCategoryId(null);
    setEditedTitle("");
  };

  const checkboxHandler = (e) => {
    setCheck((prev) => !prev);

    if (check === true) {
      console.log("first");
    } else {
      console.log("second");
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    setSearchTerm(value);

    if (!value) {
      setFilteredCategories(info);
    } else {
      const searchResult = info.filter((category) =>
        category.title.toLowerCase().includes(value)
      );
      setFilteredCategories(searchResult);
    }
    setCurrentPage(1);
    setJumpInput("");
  };

  // console.log(searchResult);
  // console.log(filteredCategories);
  return (
    <>
      <div className="flex flex-1 min-w-0 px-4 justify-center">
        <Sidebar />
        <div className="shadow-md overflow-auto max-h-fit md:min-w-max max-w-[900px] mx-auto w-screen rounded-b-2xl">
          <div className="overflow-auto flex flex-col h-fit min-h-fit text-slate-700 bg-white shadow-t-2xl rounded-xl">
            <div className="flex mx-4 mt-4 text-slate-700 rounded-none">
              <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            </div>

            <div className="p-0">
              {info.length > 0 ? (
                <table className="w-full mt-4 text-left table-auto min-w-max flex-nowrap">
                  <thead>
                    <tr>
                      <th className="p-4 border-y border-slate-200">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex">
                            <div className="flex border-1 border-solid border-slate-200 p-1 rounded">
                              <CiSearch size={30} />
                              <input
                                onChange={searchHandler}
                                placeholder="search categories"
                                className="pl-1 focus:outline-none"
                              />
                            </div>
                            <label className="mx-2 bg-slate-800/10 p-2 rounded">
                              <input
                                type="checkbox"
                                className="accent-sea"
                                onChange={checkboxHandler} // Correctly trigger the handler on change
                                checked={check}
                              />
                              <span> has book</span>
                            </label>
                          </div>
                          <button
                            onClick={() => setCategoryModal(true)}
                            className="group flex items-center lg:border-2 md:border-2 sm:border-2 p-[1.9px] lg:border-sea md:border-sea sm:border-sea px-1 rounded lg:hover:bg-sea sm:hover:bg-sea md:hover:bg-sea hover:text-white transition-colors duration-400"
                          >
                            <IoMdAddCircleOutline
                              size={30}
                              className="group-hover:text-ocean text-sea p-[1px] transition-colors duration-400"
                            />
                            <span className="hidden lg:inline md:inline sm:inline ml-1">
                              add
                            </span>
                          </button>
                          {categoryModal && (
                            <CategoryModal
                              onClose={() => setCategoryModal(false)}
                              setCategoryModal={setCategoryModal}
                              setCurrentPage={setCurrentPage}
                              fetchData={fetchData}
                              totalPages={totalPages}
                            />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.map((item) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="p-4 flex justify-between items-center">
                          {editingCategoryId === item.id ? (
                            <input
                              type="text"
                              value={editedTitle}
                              onChange={(e) =>
                                dispatch(setEditedTitle(e.target.value))
                              }
                              className="border p-1 rounded"
                              autoFocus
                            />
                          ) : (
                            <span>{item.title}</span>
                          )}
                          <div className="flex space-x-2">
                            {editingCategoryId !== item.id && (
                              <button
                                onClick={() => editHandler(item.id)}
                                className="px-2 pt-1 flex hover:bg-blue-200 rounded"
                              >
                                <CiEdit size={20} className="m-1" />
                              </button>
                            )}
                            {editingCategoryId === item.id && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveHandler(item.id)}
                                  className="px-3 py-1 flex items-center justify-center hover:bg-green-200 rounded"
                                >
                                  {loading ? (
                                    <p>
                                      <ClipLoader className="-mb-2" size={20} />
                                    </p>
                                  ) : (
                                    <p>Save</p>
                                  )}
                                </button>
                                <button
                                  onClick={cancelHandler}
                                  className="px-3 py-1 flex items-center justify-center hover:bg-yellow-100 rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                            <button
                              onClick={() => {
                                setDeleteModal(true);
                                setSelectedId(item.id);
                                setSelectedTitle(item.title);
                              }}
                              className="px-3 py-1 flex items-center justify-center hover:bg-red-200 rounded"
                            >
                              <GoTrash className="m-1" />
                            </button>
                            {deleteModal && (
                              <DeleteModal
                                onClose={() => setDeleteModal(false)}
                                className="px-3 py-1 flex hover:bg-red-100 rounded"
                                setDeleteModal={setDeleteModal}
                                id={selecetedId}
                                fetchData={fetchData}
                                totalPages={totalPages}
                                selectedTitle={selectedTitle}
                                currentPage={currentPage}
                                setInfo={setInfo}
                                setCurrentPage={setCurrentPage}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <PropagateLoader size={20} color="#023047" />
                </div>
              )}
            </div>

            {/* /////pagination */}
            <div className="text-nowrap bg-ocean/10 bg-op border-[1px] border-blue-950/15 rounded-b-2xl shadow-2xl">
              <div className="flex items-center justify-between p-3">
                <div className="flex relative">
                  <p className="text-sm text-slate-500 pr-3 pt-2.5">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="group rounded border border-slate-300 pr-2 h-fit py-1 mt-1.5   pl-1 m-1 lg:px-3 text-center text-xs font-semibold text-slate-600 transition-all ">
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

                  <div
                    ref={dropdownRef}
                    className="relative flex group rounded border border-slate-300 text-nowrap h-fit py-1 mt-1 text-center text-xs font-semibold text-slate-600 transition-all hover:cursor-pointer"
                  >
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
