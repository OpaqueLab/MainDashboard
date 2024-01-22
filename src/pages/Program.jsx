import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProgramCard from "../components/Program/ProgramCard"; // Import the ProgramCard component
import { get, post } from "../Global/api";
import { useDispatch, useSelector } from "react-redux";
import { productionTable, programTitle } from "../Global/Slice/BlogSlice";
import ProgramList from "../components/Table/ProgramList";
import Loading from "../components/Loading/Loading";

const Program = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [cate, setCate] = useState([
    {
      id: 1,
      title: "All",
      name: "all",
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

  // for program
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ?category=${cate.find((category) => category.active).name}
        const response = await get(`/programs`);

        if (response.status === 200) {
          dispatch(productionTable(null));
          dispatch(programTitle(response?.data?.data?.map((el) => el.title)));
          setData(response?.data?.data);
          setLoading(false);
        } else {
          console.error("Failed to fetch datass");
        }

        console.log(response);
        // Update setData with the response data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cate, refresh]);

  // to look program's blogs
  const ProgramTable = useSelector((state) => state?.blog?.production_table);
  // console.log(ProgramTable);

  const handleItemClick = (item) => {
    dispatch(productionTable(item));
  };

  // for removing blogs from program
  const removeHandler = (programId, blogId) => {
    try {
      const response = post(
        `/blogs/remove_program_blog/${programId}/${blogId}`
      );
      console.log(response);
      setRefresh(!refresh);
      dispatch(productionTable(null));
    } catch (error) {
      console.log(error);
    }
  };

  // for permission manage
  const userData = useSelector(
    (state) => state?.user?.user_info?.data
  );

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {userData?.role === "admin" ? (
        <>
          {/* header  */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-3xl dark:text-white">Program</h1>
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

          {/* program card  */}
          <div className="grid grid-cols-3 gap-5 mt-10">
            {data?.map((el) => {
              return (
                <div
                  onClick={() => handleItemClick(el)}
                  key={el.id}
                  className=" col-span-1"
                >
                  <ProgramCard
                    refresh={refresh}
                    setRefresh={setRefresh}
                    el={el}
                  />
                </div>
              );
            })}
          </div>

          {/* program including blogs  */}
          <div className="mt-20">
            {ProgramTable === null ? (
              <p className="w-full h-full mt-20 text-xl flex justify-center items-center dark:text-white">
                Select one of program!
              </p>
            ) : ProgramTable?.blog_count === 0 ? (
              <p className="w-full h-full mt-20 text-xl flex justify-center items-center">
                There's no blogs!
              </p>
            ) : (
              <ProgramList removeHandler={removeHandler} />
            )}
          </div>
        </>
      ) : (
        <p className=" text-center text-xl">
          You don't have permission cuz you aren't admin.
        </p>
      )}
    </div>
  );
};

export default Program;
