import React, { useEffect } from "react";
import Card from "../components/Dashboard/Card";
import DashTrending from "../components/Dashboard/DashTrending";
import DashLatest from "../components/Dashboard/DashLatest";
import { useState } from "react";
import DashToDoList from "../components/Dashboard/DashToDoList";
import { motion } from "framer-motion";
import { BsExclamationCircleFill } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { BiSolidNotepad } from "react-icons/bi";
import Globe from "../components/Globe/Globe";
import { get } from "../Global/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  const [cate, setCate] = useState([
    {
      id: 1,
      title: "All",
      name: " ",
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
  //for cate animation
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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(
          `/dashboard?category=${cate.find((category) => category.active).name}`
        );
        console.log(response);
        setData(response?.data?.data);
      } catch (error) {
        if (error?.response?.status === 403) {
          // return setTimeout(function () {
          //   window.location.reload();
          // }, 3000);
        } else {
          nav("/login");
        }
      }
    };

    fetchData();
  }, [cate]);

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-bold text-3xl text-[#344767] dark:text-white">
          Dashboard
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

      {/* Globe and Cards , Inbox */}
      <div className="grid grid-cols-12 gap-5 my-5">
        <div className="col-span-6">
          {/* Cards */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <Card
                title={"Blog Lists"}
                data={data?.list_count}
                icon={<BiSolidNotepad />}
              />
            </div>
            <div className="col-span-6">
              <Card
                title={"Pending Lists"}
                data={data?.pending_count}
                icon={<BsExclamationCircleFill />}
              />
            </div>
            <div className="col-span-6">
              <Card
                title={"Program Lists"}
                data={data?.program_count}
                icon={<HiVideoCamera />}
              />
            </div>
          </div>

          {/* Todo List */}
          <div className="col-span-6 mt-5 z-50">
            <DashToDoList />
          </div>
        </div>

        {/* Globe */}
        <div className="col-span-6 z-40 flex justify-center items-center my-auto">
          <Globe />
        </div>

        {/* Trending and Latest News */}
        {/* Trending */}
        <div className="col-span-6">
          <DashTrending />
        </div>

        {/* Latest */}
        <div className="col-span-6">
          <DashLatest />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
