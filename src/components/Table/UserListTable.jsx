import React from "react";

const UserListTable = () => {
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
        <div className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 dark:border-secondary dark:bg-secondary dark:text-white dark:hover:bg-primary">
          <div className="col-span-1 flex justify-center items-center">1</div>
          <p className="col-span-1">Music</p>
          <p className="col-span-3">Wai Linn Aung</p>
          <h1 className="col-span-3">waia@gmail.com</h1>
          <p className="col-span-2">09790658104</p>
          <p className="col-span-1">12.3.2023</p>
          <div className="col-span-1 text-blue-500 underline cursor-pointer flex items-center justify-center gap-3">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListTable;
