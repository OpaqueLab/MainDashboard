import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../Global/api";

const ContentListTable = () => {
  const [list, setList] = useState([]);

  const fetchAllList = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ads`,
        {
          status: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      // console.log(response);
      setList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllList();
  }, []);

  console.log(list);

  return (
    <>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] dark:text-white dark:border-secondary dark:bg-secondary text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1">No.</h1>
        <h1 className="col-span-1">Category</h1>
        <h1 className="col-span-3">Username</h1>
        <h1 className="col-span-3">Email</h1>
        <h1 className="col-span-2">Phone</h1>
        <h1 className="col-span-1">Date</h1>
        <h1 className="col-span-1">Action</h1>
      </div>

      {/* Table Row */}
      <div>
        {list?.map((li,index) => {
          return (
            <div className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 dark:border-secondary dark:bg-secondary dark:text-white dark:hover:bg-primary">
              <div className="col-span-1 flex justify-center items-center">
                {index+1}
              </div>
              <p className="col-span-1">{li?.category}</p>
              <p className="col-span-3">{li?.author}</p>
              <h1 className="col-span-3">waia@gmail.com</h1>
              <p className="col-span-2">09790658104</p>
              <p className="col-span-1">12.3.2023</p>
              <div className="col-span-1 text-blue-500 underline cursor-pointer flex items-center justify-center gap-3">
                <p>Edit</p>
                <p>Delete</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContentListTable;
