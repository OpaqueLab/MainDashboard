import React, { useEffect, useState } from "react";
import { get } from "../Global/api";
import ProfileCard from "../components/Setting/ProfileCard";
import CreateMember from "../components/Setting/CreateMember";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";

const Setting = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`/users`);
        console.log(response);
        setData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);
  // for creating member
  const [opened, { open, close }] = useDisclosure(false);

  // for permission manage
  const userData = useSelector((state) => state?.user?.user_info?.data);

  // console.log(userData);
  return (
    <div className="flex flex-col gap-10">
      {userData?.role === "admin" ? (
        <>
          {/* title and add member btn  */}
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-[#344767] dark:text-white">Setting</h1>
            <button
              onClick={open}
              className="px-5 py-3 bg-primary bg-gradient-to-r text-white from-cyan-400 to-cyan-500 rounded-md self-end dark:from-iconActive dark:to-blue-600"
            >
              Add New Member
            </button>
          </div>
          {/* profile card  */}
          <div className=" grid grid-cols-12 gap-5">
            {data?.map((el) => {
              return (
                <ProfileCard
                  key={el.id}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  el={el}
                />
              );
            })}
          </div>
          {/* for creating new member  */}
          <CreateMember
            refresh={refresh}
            setRefresh={setRefresh}
            opened={opened}
            close={close}
          />
        </>
      ) : (
        <p className=" text-center text-xl">
          You don't have permission cuz you aren't admin.
        </p>
      )}
    </div>
  );
};

export default Setting;
