// export default function ProgressStep({ step }) {
//   return (
//     <ol className="flex justify-center w-full text-xs text-gray-900 font-medium sm:text-base">
//       <li
//         className={`flex w-full relative ${
//           step === 1 ? "text-ocean after:bg-ocean " : "text-gray-900 "
//         } `}
//       >
//         <div className="block whitespace-nowrap z-10 -ml-3">
//           <span
//             className={`w-6 h-6 ${
//               step === 1
//                 ? "bg-ocean border-2 border-transparent text-white"
//                 : "bg-white border-2 border-gray-200 text-ocean"
//             } rounded-full flex justify-center items-center mx-auto mb-3 text-sm`}
//           >
//             1
//           </span>
//           <p className="text-[12px]"> username</p>
//         </div>
//       </li>
//       <li
//         className={`flex w-full ${step === 2 ? "text-ocean" : "text-gray-900"}`}
//       >
//         <div className="z-10">
//           <span
//             className={`w-6 h-6 ${
//               step === 2
//                 ? "bg-ocean border-2 border-transparent text-white"
//                 : "bg-white border-2 border-gray-200"
//             } rounded-full flex justify-center items-center mx-auto mb-3 text-sm -ml-2`}
//           >
//             2
//           </span>
//           <p
//             className={`-ml-12 text-[12px] ${
//               step === 2 ? "text-ocean" : "text-gray-500"
//             }`}
//           >
//             reset password
//           </p>
//         </div>
//       </li>
//     </ol>
//   )
// }

export default function ProgressStep({ step }) {
  return (
    <ol className="flex justify-center w-full text-xs text-gray-900 font-medium sm:text-base">
      {/* Step 1 */}
      <li
        className={`flex w-full relative ${
          step === 1 ? "text-ocean" : "text-gray-900"
        }`}
      >
        <div className="block whitespace-nowrap z-1">
          <span
            className={`w-6 h-6 ${
              step === 1
                ? "bg-ocean border-2 border-transparent text-white"
                : "bg-white border-2 border-gray-200 text-ocean"
            } rounded-full flex justify-center items-center mx-auto mb-3 text-sm`}
          >
            1
          </span>
          <p className="text-[12px]"> username</p>
        </div>
        {/* Always visible ocean line between steps */}
        <div
          className={`absolute top-3 left-4 w-full h-0.5 bg-ocean ${
            step === 1 ? "" : "opacity-100"
          }`}
        ></div>
      </li>

      {/* Step 2 */}
      <li
        className={`flex w-full relative ${
          step === 2 ? "text-ocean" : "text-gray-900"
        }`}
      >
        <div className="z-10">
          <span
            className={`w-6 h-6 ${
              step === 2
                ? "bg-ocean border-2 border-transparent text-white"
                : "bg-white border-2 border-gray-200"
            } rounded-full flex justify-center items-center mx-auto mb-3 text-sm -ml-2`}
          >
            2
          </span>
          <p
            className={`-ml-12 text-[12px] ${
              step === 2 ? "text-ocean" : "text-gray-500"
            }`}
          >
            reset password
          </p>
        </div>
      </li>
    </ol>
  )
}
