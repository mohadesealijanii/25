// import { CiSearch } from "react-icons/ci";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import CategoryModal from "../modules/CategoryModal";
// import { useState } from "react";
// function SearchRow({
//   fetchData,
//   totalPages,
//   info,
//   setCurrentPage,
//   setFilteredCategories,
//   setSearchTerm,
//   setJumpInput,
// }) {
//   const [categoryModal, setCategoryModal] = useState(false);

//   const searchHandler = (e) => {
//     const value = e.target.value.toLowerCase();
//     console.log(value);
//     setSearchTerm(value);

//     if (!value) {
//       setFilteredCategories(info);
//     } else {
//       const searchResult = info.filter((category) =>
//         category.title.toLowerCase().includes(value)
//       );
//       setFilteredCategories(searchResult);
//     }
//     setCurrentPage(1);
//     setJumpInput("");
//   };
//   return (
//     <div className="flex justify-between items-center w-full">
//       <div className="flex border-[1px] border-solid border-slate-200 p-2 rounded">
//         <CiSearch size={30} />
//         <input
//           onChange={searchHandler}
//           placeholder="search categories"
//           className="pl-2 focus:outline-none"
//         />
//       </div>
//       <button
//         onClick={() => setCategoryModal(true)}
//         className="flex border-2 border-sea p-1.5 rounded hover:bg-sea hover:text-white transition-colors duration-400"
//       >
//         <IoMdAddCircleOutline size={20} />‌ add category
//       </button>
//       {categoryModal && (
//         <CategoryModal
//           onClose={() => setCategoryModal(false)}
//           setCategoryModal={setCategoryModal}
//           setCurrentPage={setCurrentPage}
//           fetchData={fetchData}
//           totalPages={totalPages}
//         />
//       )}
//     </div>
//   );
// }

// export default SearchRow;
