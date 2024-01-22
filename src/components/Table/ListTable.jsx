import React, { useState } from "react";
import publish from "../../../public/publish.svg";
import publishActive from "../../../public/publishActive.svg";
import { RxDash } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addDetail } from "../../Global/Slice/BlogSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const ListTable = ({
  checkedItems,
  setCheckedItems,
  setBlogs,
  refresh,
  setRefresh,
  data,
}) => {
  // console.log(data);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const token = Cookies.get("token");

  // for check and collect id

  const handleCheck = (e, element) => {
    e.stopPropagation();

    const { id } = element;

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));

    setBlogs((prevBlogs) => {
      if (e.target.checked) {
        return [...prevBlogs, id];
      } else {
        return prevBlogs.filter((blogId) => blogId !== id);
      }
    });
  };

  const regex = /(<([^>]+)>)/gi;

  // for publish blogs
  const publishHandler = async (id, is_published) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/blogs/published/${
        is_published ? "false" : "true"
      }`,
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
    console.log(response);
    setRefresh(!refresh);
  };

  const handlePublish = async (e, id, is_published) => {
    id;
    e.stopPropagation();
    Swal.fire({
      text: "Are you sure to publish this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ECD5B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Publish",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Published!");
        publishHandler(id, is_published);
      }
    });
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

  // for permission manage
  const userData = useSelector((state) => state?.user?.user_info?.data);

  return (
    <>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] dark:text-white dark:border-secondary dark:bg-secondary text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1"></h1>

        {/* permission manage  */}
        {userData?.role === "admin" ? (
          <h1 className="col-span-1">Publish</h1>
        ) : (
          ""
        )}

        <h1 className="col-span-1">Category</h1>
        <h1 className="col-span-1">Author</h1>
        {userData?.role === "admin" ? "" : <h1 className="col-span-1"></h1>}
        <h1 className="col-span-3">Blog Title</h1>
        <h1 className="col-span-2">Description</h1>
        <h1 className="col-span-1">Program</h1>

        {/* base on role ui change  */}
        <h1
          className={`${
            userData?.role === "admin" ? "col-span-1" : "col-span-2"
          }`}
        >
          Date
        </h1>

        {/* permission manage  */}
        {userData?.role === "admin" ? (
          <h1 className="col-span-1">Action</h1>
        ) : (
          ""
        )}
      </div>

      {/* Table Row */}
      <div>
        {data?.map((el) => {
          return (
            <div
              onClick={() => dispatch(addDetail(el), nav("/preview"))}
              key={el.id}
              className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 dark:border-secondary dark:bg-secondary dark:text-white dark:hover:bg-primary"
            >
              <div className="col-span-1 flex justify-center items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={checkedItems[el.id]}
                  onClick={(e) => handleCheck(e, el)}
                />
              </div>

              {/* publish and permission manage  */}
              {userData?.role === "admin" ? (
                <div
                  onClick={(e) => handlePublish(e, el?.id, el?.is_published)}
                  className="col-span-1 cursor-pointer flex justify-center items-center"
                >
                  <img
                    src={el?.is_published ? publishActive : publish}
                    alt=""
                    className="w-8 h-8"
                  />
                </div>
              ) : (
                ""
              )}

              <p className="col-span-1">{el?.category}</p>
              <p className="col-span-1">{el?.author}</p>
              {userData?.role === "admin" ? (
                ""
              ) : (
                <h1 className="col-span-1"></h1>
              )}
              <p className="col-span-3">{el?.title}</p>
              {/* description  */}
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

              {/* base on role ui change  */}
              <p
                className={`${
                  userData?.role === "admin" ? "col-span-1" : "col-span-2"
                }`}
              >
                {el?.date}
              </p>

              {/* edit and delete and permisson manage  */}
              {userData?.role === "admin" ? (
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
                  {el?.is_published ? (
                    " "
                  ) : (
                    <p onClick={(e) => handleDelete(e, el?.id)}>Delete</p>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListTable;
