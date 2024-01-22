import { Center, Pagination, Select } from "@mantine/core";
import React, { useEffect } from "react";
import ListTable from "../components/Table/ListTable";
import { useState } from "react";
import { get } from "../Global/api";
import { motion } from "framer-motion";
import Loading from "../components/Loading/Loading";
import { Button, Modal } from "@mantine/core";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const List = () => {
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // for limit
  const [limit, setLimit] = useState(10);
  // for pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const program = useSelector((state) => state?.blog?.program_title);
  // console.log(program);
  // for showing list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(
          `/blogs?&category=${
            cate.find((category) => category.active).name
          }&page=${page}&limit=${limit}
          `
        );
        console.log(response);
        setData(response?.data?.data);
        setPagination(response?.data?.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, limit, cate, refresh]);

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

  // add to program
  const token = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [programCate, setProgramCate] = useState("");
  const [error, setError] = useState(" ");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // for showing program title
  const [blogs, setBlogs] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const nav = useNavigate();
  const AddToProgram = async () => {
    try {
      const postData = {
        title: title,
        blogs: blogs,
        category: programCate,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/programs`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data sent successfully:", response.data);

      // Clear the selected blogs and reset the title
      setBlogs([]);
      setCheckedItems([]);
      setTitle("");

      closeModal();
      nav("/program");
    } catch (error) {
      console.error("Error sending data:", error);

      if (error?.response?.data?.errors?.blogs) {
        setError("*You have not selected any blogs");
      }
      if (
        error?.response?.data?.errors?.title ||
        error?.response?.data?.errors?.category
      ) {
        setError("*Program Name , Category and Blogs are required");
      }

      if (error?.response?.data?.message) {
        setError(
          "*One of the selected blogs is already associated with this program"
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl text-[#344767] dark:text-white">Blog List</h1>
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
      {/* body  */}
      <div className="shadow-lg rounded-md border mt-5 dark:bg-secondary dark:border-primary">
        {/* Filter entries select and Add program Button*/}
        <div className="px-3 py-5 border-b flex items-center justify-between dark:border-primary">
          {/* litmit of list  */}
          <div className="flex items-center gap-2">
            <Select
              className="w-[70px]"
              value={limit}
              onChange={setLimit}
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
          {/* add to program  */}
          <div>
            <button
              onClick={openModal}
              className="p-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-bold shadow-lg hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
            >
              Create Program ( {blogs?.length} )
            </button>
          </div>
        </div>

        {/* Table */}
        <ListTable
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          blogs={blogs}
          setBlogs={setBlogs}
          setRefresh={setRefresh}
          refresh={refresh}
          data={data}
        />

        {/* Pagination */}
        <div className="border-t dark:border-primary">
          <Center my={"lg"}>
            <Pagination
              onChange={setPage}
              value={page}
              total={pagination?.totalPages}
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
      
      {/* Add to program  */}
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="Create Program"
        size="md"
      >
        <p className="text-red-500">{error}</p>
        {/* Modal content */}
        <div className="flex flex-col justify-center gap-10 w-full h-full">
          {/* program select  */}
          <div className="flex flex-col w-full gap-5">
            <input
              type="text"
              className=" outline-none px-3 py-2 border"
              placeholder="Enter New Program Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <p>OR</p>

            <div className="flex flex-col gap-3">
              <label className="font-bold " htmlFor="">
                Choose You Created Program
              </label>
              <select
                className="py-2 px-5 outline-none"
                name=""
                id=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="">Select an option</option>
                {program?.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* select category  */}
          <div className="flex flex-col gap-3">
            <label className="font-bold " htmlFor="">
              Choose Category
            </label>
            <select
              className="py-2 px-5 outline-none"
              name=""
              id=""
              value={programCate}
              onChange={(e) => setProgramCate(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="music">Music</option>
              <option value="sport">Sport</option>
            </select>
          </div>

          {/* button  */}
          <div className="flex justify-around">
            {/* Submit button */}
            <Button variant="primary" onClick={AddToProgram}>
              Submit
            </Button>

            {/* Example Close button */}
            <Button variant="light" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default List;
