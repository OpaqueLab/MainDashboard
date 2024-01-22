import React, { useState } from "react";
import { motion } from "framer-motion";
import UserListTable from "../components/Table/UserListTable";
import { Center, Pagination, Select } from "@mantine/core";

const UserList = () => {
  const [cate, setCate] = useState([
    {
      id: 1,
      title: "All",
      name: "",
      active: true,
    },
    {
      id: 2,
      title: "Sport",
      name: "sport",
      active: false,
    },
    {
      id: 3,
      title: "Music",
      name: "music",
      active: false,
    },
  ]);

  // for cate animation
  const handleCategoryClick = (categoryId) => {
    const updatedCategories = cate.map((category) => {
      if (category.id === categoryId) {
        return { ...category, active: true };
      } else {
        return { ...category, active: false };
      }
    });
    setCate(updatedCategories);
  };

  const getActiveDivRight = () => {
    const activeCategory = cate.find((category) => category.active);
    if (activeCategory.title === "All") {
      return 256;
    } else if (activeCategory.title === "Sport") {
      return 128;
    } else {
      return 0;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl text-[#344767] dark:text-white">
          User List
        </h1>
        {/* category  */}
        <div className="bg-violet-100 p-1 rounded-2xl">
          <div className="flex relative">
            {cate.map((el) => {
              return (
                <div
                  key={el.id}
                  className={`bg-violet-100 w-32 px-10 py-1 cursor-pointer`}
                  onClick={() => handleCategoryClick(el.id)}
                >
                  <p className="relative z-20 text-center">{el.title}</p>
                </div>
              );
            })}
            <motion.div
              className="z-10 absolute w-32 h-full rounded-xl bg-white"
              initial={{ right: getActiveDivRight() }}
              animate={{ right: getActiveDivRight() }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-md border mt-5 dark:bg-secondary dark:border-primary">
        {/* Filter entries select and Add program Button*/}
        <div className="px-3 py-5 border-b flex items-center justify-between dark:border-primary">
          {/* litmit of list  */}
          <div className="flex items-center gap-2">
            <Select
              className="w-[70px]"
              data={[
                { value: 5, label: "5" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
              ]}
              styles={{
                label: { color: "white" },
                input: { ":focus": { borderColor: "#13C4E0" } },
                item: {
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#13C4E0",
                      color: "white",
                    },
                  },
                },
              }}
            />
            <p className="text-sm font-semibold text-gray-700 dark:text-white">
              entries per page
            </p>
          </div>
        </div>
        {/* Table */}
        <UserListTable />
        {/* Pagination */}
        <div className="border-t dark:border-primary">
          <Center my={"lg"}>
            <Pagination
              //   onChange={setPage}
              //   value={page}
              //   total={pagination?.totalPages}
              styles={{
                control: {
                  color: "#344767",
                  borderRadius: "100%",

                  "&[data-active]": {
                    borderColor: "white",
                    //   backgroundColor:'#218FFE',
                    backgroundImage: "linear-gradient(#1BCCE8,#0CBCDA)",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  },
                  "&[data-active]&:not([data-disabled]):hover": {
                    backgroundColor: "#3D3F3D70",
                  },
                  "&:not([data-disabled]):hover": {
                    backgroundColor: "#ddd",
                  },
                },
                dots: {
                  color: "black",
                },
              }}
            />
          </Center>
        </div>
      </div>
    </div>
  );
};

export default UserList;
