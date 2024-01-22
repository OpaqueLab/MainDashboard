import React from "react";
import { RxDash } from "react-icons/rx";
import { BsExclamationLg } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDetail } from "../../Global/Slice/BlogSlice";

import { useSelector } from "react-redux";

const PendingTable = ({ parent, setRefresh, refresh, data }) => {
  // console.log(data);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const regex = /(<([^>]+)>)/gi;
  const token = Cookies.get("token");

  const addListHandler = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/published/false`,
        {
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("POST request successful:", response.data);
      setRefresh(!refresh);

      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  };

  // for deleting list
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/blogs`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            id,
          },
        }
      );
      console.log(response);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  // permission management
  const userData = useSelector((state) => state?.user?.user_info?.data);
  // console.log(parent)
  return (
    <>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3 dark:border-primary dark:text-white">
        {/* permission manage  */}
        {userData?.role === "admin" ? (
          <h1 className="col-span-1">Add to list</h1>
        ) : (
          ""
        )}

        <h1 className="col-span-1">Category</h1>
        <h1 className="col-span-1">Author</h1>
        <h1
          className={` ${
            userData?.role === "admin" ? "col-span-4" : "col-span-5"
          }`}
        >
          Blog Title
        </h1>
        <h1 className="col-span-2">Description</h1>
        <h1 className="col-span-1">Program</h1>
        <h1 className="col-span-1">Date</h1>
        <h1 className="col-span-1">Action</h1>
      </div>

      {/* Table Row */}
      <div>
        {data?.map((el) => {
          return (
            <div
              onClick={() => dispatch(addDetail(el), nav("/preview"))}
              key={el.id}
              className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 dark:border-primary dark:bg-secondary dark:hover:bg-primary dark:text-white"
            >
              {/* add to list and permission manage  */}
              {userData?.role === "admin" ? (
                <div className="col-span-1 flex justify-center items-center">
                  <p
                    onClick={(e) => addListHandler(e, el?.id)}
                    className={
                      "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white p-2 rounded-full w-8 transition-all cursor-pointerdark:from-iconActive dark:to-blue-600"
                    }
                  >
                    <BsExclamationLg />
                  </p>
                </div>
              ) : (
                ""
              )}

              <p className="col-span-1">{el?.category}</p>
              <p className="col-span-1">{el?.author}</p>
              {/* permission  */}
              <p
                className={` ${
                  userData?.role === "admin" ? "col-span-4" : "col-span-5"
                }`}
              >
                {el?.title}
              </p>

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
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addDetail(el));
                    nav(`/edit`);
                  }}
                >
                  Edit
                </p>

                {/* permission manage  */}
                {userData?.role === "admin" || parent === "myblogs" ? (
                  <p onClick={(e) => handleDelete(e, el?.id)}>Delete</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PendingTable;
