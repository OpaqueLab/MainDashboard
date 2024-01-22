import React from "react";
import { RxDash } from "react-icons/rx";
import { BsExclamationLg } from "react-icons/bs";
import { useSelector } from "react-redux";

const ProgramList = ({ removeHandler }) => {
  const regex = /(<([^>]+)>)/gi;
  const data = useSelector((state) => state?.blog?.production_table);
  console.log(data);

  return (
    <>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1">Category</h1>
        <h1 className="col-span-2">Author</h1>
        <h1 className="col-span-4">Blog Title</h1>
        <h1 className="col-span-2">Description</h1>
        <h1 className="col-span-1">Program</h1>
        <h1 className="col-span-1">Date</h1>
        <h1 className="col-span-1">Action</h1>
      </div>

      {/* Table Row */}
      <div>
        {data?.blogs?.map((el) => {
          return (
            <div
              key={el.id}
              className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200"
            >
              <p className="col-span-1">{el?.category}</p>
              <p className="col-span-2">{el?.author}</p>
              <p className="col-span-4">{el?.title}</p>

              <p className="col-span-2">
                {el?.description
                  ?.replace(regex, "")
                  ?.replace(
                    /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
                    " "
                  )
                  .substring(0, 10)}
                ...
              </p>
              {/* program  */}
              <p className="col-span-1 flex justify-center">
                {el?.programs.length === 0 ? (
                  <RxDash />
                ) : (
                  el?.programs?.map((el) => el)
                )}
              </p>

              <p className="col-span-1">{el?.date}</p>
              <div className="col-span-1 text-blue-500 underline cursor-pointer flex items-center justify-center gap-3">
                <p onClick={()=>removeHandler(data?.id,el?.id)}>Remove</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProgramList;
